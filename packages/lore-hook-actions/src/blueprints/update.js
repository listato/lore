import { ActionTypes, PayloadStates } from 'lore-utils';
import normalize from '../normalize';

export default function(modelName, models, lore) {
  const Model = models[modelName];

  return {
    blueprint: 'update',

    model: Model,

    optimistic: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.UPDATING
    },

    onSuccess: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.RESOLVED
    },

    onError: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.ERROR_UPDATING
    },

    onNotFound: {
      actionType: ActionTypes.update(modelName),
      payloadState: PayloadStates.NOT_FOUND
    },

    normalize: {

      // look through the model and generate actions for any attributes with
      // nested data that should be normalized
      getActions: function(model) {
        return normalize(lore, modelName).model(model);
      },

      // dispatch any actions created from normalizing nested data
      dispatchActions: function(actions, dispatch) {
        actions.forEach(dispatch);
      }

    }
  };
}
