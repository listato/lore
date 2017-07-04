/* eslint no-param-reassign: "off" */

import connect from './connect';
import find from './blueprints/find';
import byId from './blueprints/byId';
import singleton from './blueprints/singleton';
import all from './blueprints/all';
import byCid from './blueprints/byCid';

export default {

  dependencies: ['actions'],

  defaults: {
    connect: {
      blueprints: {
        find,
        byId,
        singleton,
        all,
        byCid
      },
      reducerActionMap: {
        '*.all': {
          action: null,
          reducer: '*.byCid',
          blueprint: 'all'
        },
        '*.byCid': {
          action: null,
          reducer: '*.byCid',
          blueprint: 'byCid'
        },
        '*.byId': {
          action: '*.get',
          reducer: '*.byId',
          blueprint: 'byId'
        },
        '*.find': {
          action: '*.find',
          reducer: '*.find',
          blueprint: 'find'
        }
      }
    }
  },

  load: function(lore) {
    const config = lore.config.connect;
    const actions = lore.actions;
    const reducerActionMap = config.reducerActionMap;
    const blueprints = config.blueprints;

    lore.connect = connect(actions, blueprints, reducerActionMap);
  }

};
