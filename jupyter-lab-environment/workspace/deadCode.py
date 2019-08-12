class Vault:
    def __init__(self):
        self.reserve = 0
        
class BondingCurve:
    def __init__(self):
        self.bonded_tokens = 0
        self.reserve = 0

class Project:
    def __init__(self):
        self.vault = Vault()
        self.bonding_curve = BondingCurve()
        self.funding_goal = 1_000_000
        self.funding_period = 6 # months
        self.tax_rate = .05
    
class Investor:
    def __init__(self):
        self.trading_balance = 10_000 # dollars
        self.invested = 0
        self.bonded_tokens = 0
        self.estimated_value = 0 # dollar value of tokens
        self.sentiment = 1 # 1 being hold indefinitely, 0 being sell immediately... tbd
        
class StateAgregated(StateType):
    pool_balance = auto()
    
    @classmethod
    def initial_conditions(cls):
        return {
            **cls.initial_state()
        }
    
class ActionsExogenous(ActionsType):
    new_investors = auto()
    investment_pool_generator = auto()
    
    @classmethod
    def _new_investors(cls, params, step, sL, s, _input):        
        network: nx.Graph = nx.read_gpickle(s['network'])

        projects = get_node_ids_of_type(network, 'project')
        project = projects[0]
        investors = get_node_ids_of_type(network, 'investor')

        currently_invested = list(network.neighbors(project))
        
        number_of_investors = max_investors_per_project/(1 + math.pow(math.e, -(s['timestep'] - sigmoid_inflection)*sigmoid_slope))
        number_of_investors = max(math.floor(number_of_investors), 0)

        new_investors = investors[len(currently_invested) : number_of_investors]

        for index in new_investors:
            network.add_edge(project, index)
        
        pickle_file = 'pickle/network_%s.pickle' % s['timestep']
        nx.write_gpickle(network, pickle_file)
        return ('network', pickle_file)
    
    @classmethod
    def _investment_pool_generator(cls, params, step, sL, s, _input):
        y = StateExogenous.tx_volume
        x = s[StateExogenous.tx_volume]*(1+2*eta*np.random.rand()*(1-s[StateExogenous.tx_volume]/tampw))
        return (y, x)
    
class ActionsGenesis(ActionsType):
    create_network = auto()
    
    @classmethod
    def _create_network(cls, _params, step, sL, s, _input):
        if _input[cls.create_network]:
            network = generate_network(_params)
            pickle_file = 'pickle/network_%s.pickle' % s['timestep']
            write_gpickle(network, pickle_file)
            return ('network', pickle_file)
        else:
            return None

class TradingActions(ActionsType):
    perform_trades = auto()
    
    @classmethod
    def _perform_trades(cls, _params, step, sL, s, _input):
        network: nx.Graph = nx.read_gpickle(s['network'])
        
        # Extract nodes from network graph
        projects = get_node_ids_of_type(network, 'project')
        project = projects[0]
        investors = get_node_ids_of_type(network, 'investor')
        currently_invested = list(network.neighbors(project))
        
        for index in currently_invested:
            project = projects[0]
            
            project_node = network.node[project]
            investor_node = network.node[index]
            
            vault = project_node['vault']
            bonding_curve = project_node['bonding_curve']
            
            # Calculate buy tax
            collateral_to_invest = _params[0]['investment_size']
            collateral_tax = collateral_to_invest * project_node['tax_rate']
            collateral_less_tax = collateral_to_invest - collateral_tax
            
            # Calculate estimated value of investor bonded tokens before trades performed
            estimated_value = reward_for_burn(investor_node['bonded_tokens'], bonding_curve['bonded_tokens'], bonding_curve['reserve'])
            
            # Check investor status
            check_funds = investor_node['trading_balance'] >= collateral_to_invest
            check_initial_investment = investor_node['invested'] == 0 #TODO
            check_roi = estimated_value > 0 and investor_node['invested'] > 0 and (estimated_value - investor_node['invested']) / investor_node['invested'] > investor_node['desired_roi']/2
            
            if check_funds and check_initial_investment: # or check_roi: # or check_roi #not check_initial_investment:
                investor_node['logs']['disinvested'] = False
                # Calculate token trade value
                tokens_buy = collateral_to_token_buying(collateral_less_tax, bonding_curve['bonded_tokens'])
                
                # Update system balances
                vault['reserve'] += collateral_tax
                bonding_curve['bonded_tokens'] += tokens_buy
                bonding_curve['reserve'] += collateral_less_tax
                
                # Update investor balances
                investor_node['taxed'] += collateral_tax
                investor_node['trading_balance'] -= collateral_to_invest
                investor_node['invested'] += collateral_less_tax
                investor_node['bonded_tokens'] += tokens_buy
            
            # Check investor status
            estimated_value = reward_for_burn(investor_node['bonded_tokens'], bonding_curve['bonded_tokens'], bonding_curve['reserve'])
            check_sentiment = investor_node['sentiment'] < 1
            check_roi = investor_node['invested'] > 0 and (estimated_value - investor_node['invested']) / investor_node['invested'] > investor_node['desired_roi']
            
#             investor_node['logs']['entry'] = _params
            # When estimated_value is greater than invested by more than desired ROI, then sell
            if False and check_sentiment and check_roi:
                # Sell 100% of holdings
                if sell_holdings(investor_node, bonding_curve, estimated_value):
                    investor_node['logs']['disinvested'] = True
            
        pickle_file = 'pickle/network_%s.pickle' % s['timestep']
        nx.write_gpickle(network, pickle_file)
        return ('network', pickle_file)
    
class UpdateActions(ActionsType):
    update_balances = auto()
    
    @classmethod
    def _update_balances(cls, params, step, sL, s, _input):
        network: nx.Graph = nx.read_gpickle(s['network'])

        projects = get_node_ids_of_type(network, 'project')
        project = projects[0]
        investors = get_node_ids_of_type(network, 'investor')
        
        currently_invested = list(network.neighbors(project))
        
        for index in currently_invested:
            project = projects[0]
            
            project_node = network.node[project]
            investor_node = network.node[index]
            
            vault = project_node['vault']
            bonding_curve = project_node['bonding_curve']
            
            # Calculate estimated value of investor bonded tokens after trades performed
            investor_node['estimated_value'] = reward_for_burn(investor_node['bonded_tokens'], bonding_curve['bonded_tokens'], bonding_curve['reserve'])
        
        pickle_file = 'pickle/network_%s.pickle' % s['timestep']
        nx.write_gpickle(network, pickle_file)
        return ('network', pickle_file)
    
class MetricPolicies(PoliciesType):
    def agregate(self, params, step, sL, s):
        return({MetricActions.agregate: 1})
    
class Policies(PoliciesType):
    def genesis(self, params, step, sL, s):
        if s['timestep'] == 1:
            return ({ActionsGenesis.create_network: True})
        else:
            return ({ActionsGenesis.create_network: False})