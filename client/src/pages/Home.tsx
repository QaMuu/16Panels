
import {ITechInfo, TechStack} from "../datas/TechStack.ts";
import {Box, Grid, For, Button, HStack} from "@yamada-ui/react";
import {ControlPanelItem} from "../components/ControlPanelItem.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface IPanelInfo {
  isVisible: boolean;
  stack: ITechInfo;
}

const aryTechStacks: ITechInfo[] = TechStack;

export function Home() {
  const [aryPanelInfo, setAryPanelInfo] = useState<IPanelInfo[]>([]);

  useEffect(() => {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: false, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);
  }, []);

  useEffect(() => {

  }, [aryPanelInfo]);

  function handlerFullOpenClick() {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: true, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);
  }

  function handlerFullCloseClick() {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: false, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);
  }

  function handlerPanelItemClick(index:number, isVisible:boolean) {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      if(i === index) {
        _techStack.push({isVisible: isVisible, stack: aryTechStacks[i]});
      } else {
        _techStack.push({isVisible: aryPanelInfo[i].isVisible, stack: aryTechStacks[i]});
      }
    }

    setAryPanelInfo(_techStack);
  }

  return (
    <>
      <Box bg={'#030f15'} color={'#FFFFFF'} p={6}>

        <HStack marginBottom={'6'}>

          <Button onClick={handlerFullOpenClick}>
            Full Open
          </Button>

          <Button onClick={handlerFullCloseClick}>
            Full Close
          </Button>

          <Link to={'/panels'}>panels</Link>

        </HStack>

        <Grid templateColumns="repeat(6, 6fr)" ml={"2px"} mr={"2px"} border={'4px solid #8d63e7'} rounded={2}>
          <For each={aryPanelInfo}>
            {(info:IPanelInfo, index:number) => (
              <ControlPanelItem index={index} isVisible={info.isVisible} stack={info.stack} clickHandler={handlerPanelItemClick}/>
            )}
          </For>
        </Grid>

      </Box>
    </>
  );
}