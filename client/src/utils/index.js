/* eslint-disable import/prefer-default-export */
// the lintes is not happy with this function because we have only one...
// but we will add more soon!
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
