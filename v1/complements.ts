import { ComplementGroup } from '@appjusto/types';

export const isComplementGroupEqual = (
  a: ComplementGroup,
  b: ComplementGroup
) => {
  if (a.enabled !== b.enabled) return false;
  if (a.items?.length !== b.items?.length) return false;
  if (
    a.items?.some((c, i) => {
      if (c.description != b.items![i].description) return true;
      if (c.enabled != b.items![i].enabled) return true;
      if (c.name != b.items![i].name) return true;
      if (c.price != b.items![i].price) return true;
    })
  )
    return false;
  if (a.minimum !== b.minimum) return false;
  if (a.maximum !== b.maximum) return false;
  if (a.name !== b.name) return false;
  if (a.required !== b.required) return false;
  return true;
};
