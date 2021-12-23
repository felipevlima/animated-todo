import React from 'react'
import { Box, Text, VStack, ScrollView, Icon, Image, useColorModeValue } from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'
import { Link } from '@react-navigation/native'

const AboutScreen = () => {
  return (
    <AnimatedColorBox flex={1} bg={useColorModeValue('warmgray.50', 'warmGray.900')} w="full">
      <Masthead title="About the App" image={require('../assets/about-masthead.png')}>
        <Navbar />
      </Masthead>
      <ScrollView borderTopLeftRadius="20px" borderTopRightRadius={"20px"} bg={useColorModeValue('warmGray.50', 'primary.900')} mt="-20px" pt="30px" p={4}>
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image source={require('../assets/profile-image.png')} borderRadius={"full"} resizeMode='cover' w={120} h={120}/>
          </Box>
            <Text fontSize={'md'} w="full">This is React Native tutorial built in youtube channel called DevAsLife</Text>
            <LinkButton colorScheme='red' size="lg" borderRadius={'full'} href="https://www.youtube.com.br" leftIcon={<Icon as={Feather} name="youtube" size="sm" opacity={0.5}/>}>Go to youtube channel</LinkButton>
            <LinkButton colorScheme={useColorModeValue('blue', 'darkBlue')} size="lg" borderRadius={'full'} href="https://www.youtube.com.br" leftIcon={<Icon as={Feather} name="twitter" size="sm" opacity={0.5}/>}>@felipe_vlima</LinkButton>
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen