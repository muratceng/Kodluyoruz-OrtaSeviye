import { Box,Text,Button } from '@chakra-ui/react';
import React from 'react';
import { SiLinkedin,SiGithub  } from 'react-icons/si';

function Footer() {
  return (
    <Box className='footer' height={100}  alignItems='center' textAlign='center' backgroundColor='pink' m='auto'>  
    <Text mt={5} mb={5}>Edited by Murat Çalışkan</Text> 
    <Button me={5} type='linkedin'  leftIcon={<SiLinkedin />} >
    <a href='https://www.linkedin.com/in/murat-clskn/' target='_blank'>Linkedin</a>
  </Button>
  <Button  colorScheme='gray' leftIcon={<SiGithub />} >
    <a href='https://github.com/muratceng' target='_blank'>Github</a>
  </Button>

    </Box>
  )
}

export default Footer;
