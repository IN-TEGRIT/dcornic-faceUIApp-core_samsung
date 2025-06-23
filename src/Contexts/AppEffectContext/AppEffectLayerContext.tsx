import React, { useState } from "react";

// Types
import { EAppEffectType, IAppEffectLayer } from "../../Types/AppEffect.d";

const AppEffectLayerContext = React.createContext<IAppEffectLayer>({
  effectType: EAppEffectType.NONE,
  showEffect: (effect: EAppEffectType) => {},
});

export function AppEffectLayerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [effectType, setEffectType] = useState<EAppEffectType>(EAppEffectType.NONE);

  const showEffect = (effectType: EAppEffectType) => {
    setEffectType(effectType);
  };

  return (
    <AppEffectLayerContext.Provider
      value={{
        effectType,
        showEffect,
      }}
    >
      {children}
    </AppEffectLayerContext.Provider>
  );
}

export default AppEffectLayerContext;
