
import {ITechInfo, TechStack} from "../datas/TechStack.ts";
import {Box, Grid, For} from "@yamada-ui/react";
import {PanelItem} from "../components/PanelItem.tsx";
import {useEffect, useState} from "react";

interface IPanelInfo {
  isVisible: boolean;
  stack: ITechInfo;
}

const aryTechStacks: ITechInfo[] = TechStack;

export function ViewerPanels() {
  const [aryPanelInfo, setAryPanelInfo] = useState<IPanelInfo[]>([]);

  useEffect(() => {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: true, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);
  }, []);

  return (
    <Box bg={'#030f15'} color={'#FFFFFF'} p={4}>
      <Grid templateColumns="repeat(6, 6fr)" border={'4px solid #8d63e7'} rounded={36}>
        <For each={aryPanelInfo}>
          {(info:IPanelInfo, index:number) => (
            <PanelItem index={index} isVisible={info.isVisible} stack={info.stack}/>
          )}
        </For>
      </Grid>
    </Box>
  );
}