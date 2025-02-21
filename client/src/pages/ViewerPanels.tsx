
import {ITechInfo, TechStack} from "../datas/TechStack.ts";
import {Box, Grid, For, Link} from "@yamada-ui/react";
import {PanelItem} from "../components/PanelItem.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import io from 'socket.io-client';

interface IPanelInfo {
  isVisible: boolean;
  stack: ITechInfo;
}

const aryTechStacks: ITechInfo[] = TechStack;

export function ViewerPanels() {
  const navigate = useNavigate();
  const [aryPanelInfo, setAryPanelInfo] = useState<IPanelInfo[]>([]);


  useEffect(() => {
    const _techStack:IPanelInfo[] = [];

    for (let i = 0; i < aryTechStacks.length; i++) {
      _techStack.push({isVisible: false, stack: aryTechStacks[i]});
    }

    setAryPanelInfo(_techStack);

    const socket = io(import.meta.env.VITE_SOCKET_URL as string); // バックエンドに接続

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('panelStatusUpdate', (status) => {
      console.log('panelStatusUpdate : ', status);
      setAryPanelInfo(status as IPanelInfo[]);
    });

    return () => {
      socket.disconnect(); // コンポーネントUnmount時に切断
    };

  }, []);

  function handlerGoToControlButtonClick() {
    navigate('/control');
  }

  return (
    <Box bg={'#030f15'} color={'#FFFFFF'} p={4}>
      <Grid templateColumns="repeat(6, 6fr)" border={'4px solid #0e233d'} rounded={36} mb={6}>
        <For each={aryPanelInfo}>
          {(info:IPanelInfo, index:number) => (
            <PanelItem index={index} isVisible={info.isVisible} stack={info.stack}/>
          )}
        </For>
      </Grid>

      <Link onClick={handlerGoToControlButtonClick} color={'#83183e'} textDecoration={'underline'}>
        Go to Control View
      </Link>

    </Box>
  );
}