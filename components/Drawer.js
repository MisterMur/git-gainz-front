import Drawer from 'react-native-circle-drawer'

render(){
    return(
        <Drawer sideMenu={this.renderSideMenu()}>
            <App/>
        </Drawer>
    )
}
openDrawer(){
    this.refs.DRAWER.open
}

renderSideMenu(){
    return(
        <View style={{flex:1}}>
            <Text>Item 1 </Text>
            <Text>Item 2 </Text>
        </View>
    )
}

renderTopRightView(){
    return(
        <View>
            <Text>Hello</Text>
        </View>
    )
}

render(){
    <Drawer
        ref="DRAWER"
        sideMenu={this.renderSideMenu()}
        topRightView={this.renderTopRightView()}
    >
      <Button title="open drawer" onPress={()=>this.openDrawer()} />
      <Text>Main application here!!</Text>
    </Drawer>

}
