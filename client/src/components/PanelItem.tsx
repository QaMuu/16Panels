import {Center, GridItem} from "@yamada-ui/react";
import {ITechInfo} from "../datas/TechStack.ts";
import {useEffect, useState} from "react";

export function PanelItem(props: { index: number, isVisible:boolean, stack: ITechInfo }) {
  const [borderRightSetting, setBorderRightSetting] = useState('4px solid #0e233d');
  const [borderBottomSetting, setBorderBottomSetting] = useState('4px solid #0e233d');
  const [textColor, setTextColor] = useState('#FFFFFF');

  useEffect(() => {

    if(props.index % 6 === 5) {
      setBorderRightSetting('');
    }

    if(props.index >= 30) {
      setBorderBottomSetting('');
    }

    if (props.isVisible) {
      setTextColor(props.stack.language ? '#FFFFFF' : '#ccaa03');
    } else {
      setTextColor('#030f15');
    }
  }, [props.isVisible]);

  return (
    <GridItem
      borderRight={borderRightSetting}
      borderBottom={borderBottomSetting}
      key={props.index} w="full" py={'1.5em'} rounded="sm" fontSize={'4xl'} fontWeight={'bold'}
      color={textColor}>
      <Center>{props.stack.name}</Center>
    </GridItem>
  );
}