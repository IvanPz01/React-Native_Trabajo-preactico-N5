import React from 'react'
import { View, Text } from 'react-native'

const User = ({ route }) => {

    const { id, userName } = route.params

  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>User: {userName}</Text>
    </View>
  )
}

export default User