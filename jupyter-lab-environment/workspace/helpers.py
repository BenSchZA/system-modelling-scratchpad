# Custom cadCAD type classes
######################################################################################
from enum import Enum, auto
import numpy as np

class StateType(Enum):
    @classmethod
    def initial_state(cls):
        _members = {}
        for item in cls.__members__:
            _members[cls[item]] = 0
        return _members
    
    def initial_conditions(cls):
        print("initial_conditions not implemented")

class ActionsType(Enum):
    def __init__(self, *args, **kwargs):
        pass
    
    def method(self, *args):
        method = getattr(self.__class__, '_%s' % self.name)
        return method(*args)

class PoliciesType:
    def list(self):
        policies = [func for func in dir(self) 
                    if (callable(getattr(self, func)) 
                        and func != 'list' 
                        and func.find('_'))]
        returnVal = {}
        for func in policies: returnVal[func] = getattr(self, func)
        return returnVal
    
######################################################################################
    
# Utility functions
######################################################################################

def id():
    return uuid.uuid4().int & (1<<64)-1

def bollinger_bands(value, window_size, num_of_std):

    rolling_mean = value.rolling(window=window_size).mean()
    rolling_std  = value.rolling(window=window_size).std()
    upper_band = rolling_mean + (rolling_std*num_of_std)
    lower_band = rolling_mean - (rolling_std*num_of_std)

    return rolling_mean, upper_band, lower_band

def get_node_ids_of_type(network, _type):
    return [x for x,y in network.nodes(data=True) if y['_type']==_type]

def pad(vec, length,fill=True):

    if fill:
        padded = np.zeros(length,)
    else:
        padded = np.empty(length,)
        padded[:] = np.nan
        
    for i in range(len(vec)):
        padded[i]= vec[i]
        
    return padded

def make2D(key, data, fill=False):
    maxL = data[key].apply(len).max()
    newkey = 'padded_'+key
    data[newkey] = data[key].apply(lambda x: pad(x,maxL,fill))
    reshaped = np.array([a for a in data[newkey].values])
    
    return reshaped