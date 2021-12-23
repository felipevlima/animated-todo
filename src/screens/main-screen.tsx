import React, { useCallback, useState } from 'react'
import { VStack, Fab, Icon, useColorModeValue, Center, Text } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import Masthead from '../components/masthead'
import shortid from 'shortid'
import Navbar from '../components/navbar'

const initalData: Array<DataType> = []

interface DataType {
  id: string
  subject: string
  done: boolean
}

export default function MainScreen() {
  const [data, setData] = useState<Array<DataType>>(initalData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }

      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)

      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback(item => {
    if (item.subject === '') {
      return setData(prevData => {
        const newData = prevData.filter(i => i !== item)
        return newData
      })
    }
    setEditingItemId(null)
  }, [])

  const handlePressTaskItemLable = useCallback(item => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  const handleCreateTask = () => {
    const id = shortid.generate()
    setData([
      {
        id,
        subject: '',
        done: false
      },
      ...data
    ])
    setEditingItemId(id)
  }

  return (
    <AnimatedColorBox bg={useColorModeValue('warmGray.50', 'primary.900')} w="full" flex={1}>
      <Masthead title="What's up, Felipe!" image={require('../assets/masthead.png')}>
        <Navbar /> 
      </Masthead>
      <VStack flex={1} space={1} mt="-20px" borderTopLeftRadius="20px" borderTopRightRadius="20px" pt="20px" bg={useColorModeValue('warmGray.50', 'primary.900')}>
        {data.length < 1 ? (
          <Center alignItems="center" justifyContent="center" h="85%">
            <Text fontSize={19} noOfLines={1} isTruncated px={1}>Nenhuma task encontrada!</Text>
          </Center>
        ) : (
          <TaskList 
            data={data}
            editingItemId={editingItemId}
            onChangeSubject={handleChangeTaskItemSubject}
            onFinishEditing={handleFinishEditingTaskItem}
            onPressLabel={handlePressTaskItemLable}
            onRemoveItem={handleRemoveItem}
            onToggleItem={handleTaskItem}
          />
        )}
      </VStack>
      <Fab 
        position="absolute" 
        renderInPortal={false} 
        size="sm" 
        icon={
          <Icon 
            color="white" as={
              <AntDesign name="plus" />
            } 
            size="sm"
          />
        }
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={handleCreateTask}
      />
    </AnimatedColorBox>
  )
}