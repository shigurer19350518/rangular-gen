import React, { useContext } from 'react';

export class <%= classify(name) %>Service {}

export const <%= classify(name) %>ServiceContext = React.createContext(new <%= classify(name) %>Service());

export function use<%= classify(name) %>Service() {
  return useContext(<%= classify(name) %>ServiceContext);
}