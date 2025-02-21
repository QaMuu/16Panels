import {Center, GridItem, Button, VStack} from "@yamada-ui/react";
import {ITechInfo} from "../datas/TechStack.ts";
import {useEffect, useState} from "react";

export function ControlPanelItem(props: { index: number, isVisible:boolean, stack: ITechInfo, clickHandler: Function }) {
  const [borderRightSetting, setBorderRightSetting] = useState('4px solid #0e233d');
  const [borderBottomSetting, setBorderBottomSetting] = useState('4px solid #0e233d');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(props.isVisible);

    if(props.index % 6 === 5) {
      setBorderRightSetting('');
    }

    if(props.index >= 30) {
      setBorderBottomSetting('');
    }

    setTextColor(props.stack.language ? '#FFFFFF' : '#ccaa03');

  }, [props.isVisible]);

  function handlerButtonClick() {
    setIsOpen(!isOpen);
    props.clickHandler(props.index, !isOpen);
  }

  return (
    <GridItem
      borderRight={borderRightSetting}
      borderBottom={borderBottomSetting}
      key={props.index} w="full" py={'2em'} rounded="sm" fontSize={'2xl'}
      color={textColor}
      as={Button}
      bg={isOpen ? '#0f2e56' : '#030f15'}
      onClick={handlerButtonClick}
    >
      <VStack gap={0}>
        <Center>{props.stack.name}</Center>
        <Center fontSize={'xl'} color={isOpen ? '#030f15' : '#8d63e7'}>{isOpen ? 'Open' : 'Close'}</Center>
      </VStack>
    </GridItem>
  );
}