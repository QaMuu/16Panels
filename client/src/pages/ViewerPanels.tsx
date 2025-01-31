
import {ITechInfo, TechStack} from "../datas/TechStack.ts";
import {Box, Grid, For} from "@yamada-ui/react";
import {PanelItem} from "../components/PanelItem.tsx";

interface IPanelInfo {
  isVisible: boolean;
  stack: ITechInfo;
}

export function ViewerPanels() {
  const techStack: ITechInfo[] = TechStack;
  const aryPanelInfo: IPanelInfo[] = [];

  for (let i = 0; i < techStack.length; i++) {
    aryPanelInfo.push({isVisible: true, stack: techStack[i]});
  }

  return (
    <Box bg={'#030f15'} color={'#FFFFFF'} p={12}>
      <Grid templateColumns="repeat(6, 6fr)" ml={"2px"} mr={"2px"} border={'4px solid #8d63e7'} rounded={36}>
        <For each={aryPanelInfo}>
          {(info:IPanelInfo, index:number) => (
            <PanelItem index={index} isVisible={info.isVisible} stack={info.stack}/>
          )}
        </For>
      </Grid>
    </Box>
  );
}