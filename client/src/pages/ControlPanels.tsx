
import {ITechInfo, TechStack} from "../datas/TechStack.ts";
import {Box, Grid, For, Button, HStack} from "@yamada-ui/react";
import {ControlPanelItem} from "../components/ControlPanelItem.tsx";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import io from 'socket.io-client';

interface IPanelInfo {
  isVisible: boolean;
  stack: ITechInfo;
}

const aryTechStacks: ITechInfo[] = TechStack;

export function ControlPanels() {
  const [aryPanelInfo, setAryPanelInfo] = useState<IPanelInfo[]>([]);
  const socket = io(import.meta.env.VITE_SOCKET_URL as string); // バックエンドに接続

  useEffect(() => {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: false, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);

    return () => {
      socket.disconnect(); // コンポーネントUnmount時に切断
    };
  }, []);

  useEffect(() => {

  }, [aryPanelInfo]);

  function handlerFullOpenClick() {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: true, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);
    socket.emit('panelStatusChange', _techStack);
  }

  function handlerFullCloseClick() {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: false, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);
    socket.emit('panelStatusChange', _techStack);
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
    socket.emit('panelStatusChange', _techStack);
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

          <Link to={'/'} target={'_blank'}>
            Open the viewer in another tab
          </Link>

        </HStack>

        <Grid templateColumns="repeat(6, 6fr)" ml={"2px"} mr={"2px"} border={'4px solid #0e233d'} rounded={2}>
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