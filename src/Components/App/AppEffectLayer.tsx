import { useState, useEffect, useContext } from "react";

// Resources
import * as UISounds from "../../Resources/Common/Sounds";

// Contexts
import { AppEffectLayerContext, RosEventManagerContext } from "../../Contexts";

// Types
import { EAppEffectType } from "../../Types/AppEffect.d";

// Constraints

export default function AppEffectLayer() {
  const { effectType } = useContext(AppEffectLayerContext);

  const [effectClassName, setEffectClassName] = useState<string>("");
  const [effectEndTimer, setEffectEndTimer] = useState<any>(null);


  useEffect(() => {
    switch (effectType) {
      case EAppEffectType.FADE_OUT_EXISTS:
        setEffectClassName("");
        break;
      default:
        setEffectClassName("hide");
        break;
    }
  }, [effectType]);


  return (
    <div
      id="app-effect-layer"
      className={`app-layer${effectClassName}`}
      style={{ backgroundColor: "#000" }}
    />
  );
}
