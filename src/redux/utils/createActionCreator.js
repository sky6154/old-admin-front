export default function createActionCreator(type, payload = {}) {
  return {type, ...payload};
}

export function createSagaAction(actionType) {
  return {
    request: req => {
      return createActionCreator(actionType.REQUEST, {req})
    },
    success: (req, data) => {
      return createActionCreator(actionType.SUCCESS, {req, data});
    },
    failure: (req, error) => {
      return createActionCreator(actionType.FAILURE, {req, error});
    }
  };
}