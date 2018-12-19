import React, {Component} from 'react';
import {StyleSheet, View,Button ,Text,TouchableOpacity} from 'react-native';
export default class App extends Component {
constructor(){
  super()
  this.state={
    _ResultText:"",
    _CalculatedResult:""
  }
  this.Opertion=['Del','+','-','*','/']
}

  CalculationResult(){
      const text=this.state._ResultText
      this.setState({
        _CalculatedResult:eval(text)
      })
  }

  ValiditeState(){
    const text=this.state._ResultText
    switch(text.slice(-1)){
          case '+':
          case '-':
          case '*':
          case '/':
          return false
    }
    return true
}

  ButtonPressed(text){
    if(text=='='){
      return this.ValiditeState() && this.CalculationResult()
    }
    this.setState({
      _ResultText:this.state._ResultText+text
    })
  }

  OperationPressed(Operation){
      switch(Operation){
        case 'Del':
                  let TempText=this.state._ResultText.split('')
                  TempText.pop()
                  this.setState({
                    _ResultText:TempText.join('')
                  })
                  break
        case '+':
        case '-':
        case '*':
        case '/':
                  const LastChar=this.state._ResultText.split('').pop()
                  if(this.Opertion.indexOf(LastChar)>0)return
                  if(this.state._ResultText=="") return
                  this.setState({
                    _ResultText:this.state._ResultText+Operation
                  })
      }
  }

  render() {
    let ButtonRows =[]
    let numb=[[7,8,9],[4,5,6],[1,2,3],['.',0,'=']]
    for(let i=0;i<4;i++){
      let row=[];
      for(let j=0;j<3;j++){
        row.push(
        <TouchableOpacity key={numb[i][j]} onPress={()=>this.ButtonPressed(numb[i][j])} style={styles.Btn}>
            <Text style={styles.BtnText}>{numb[i][j]}</Text>
        </TouchableOpacity>
        )
      }
      ButtonRows.push(<View key={numb[i]} style={styles.Row}>{row}</View>)
    }

    let ops=[]
    for (let i=0;i<5;i++){
      ops.push(
        <TouchableOpacity key={this.Opertion[i]} onPress={()=>this.OperationPressed(this.Opertion[i])} style={styles.Btn}>
          <Text style={styles.BtnText}>{this.Opertion[i]}</Text>
        </TouchableOpacity> )
    }

    return (
      <View style={styles.container}>
        <View style={styles.Result}>
          <Text style={styles.ResultText}>{this.state._ResultText}</Text>
        </View>
        <View style={styles.Calculation}> 
        <Text style={styles.CalculationText}>{this.state._CalculatedResult}</Text>
        </View>
        <View style={styles.Button}>
          <View style={styles.Number}>
            {ButtonRows}
          </View>
          <View style={styles.Opertion}>
             {ops}
          </View>
        </View>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Result:{
    flex:3,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  ResultText:{
      fontSize:30,
      color:'black'
  },
CalculationText:{
    fontSize:25,
    color:'black',
},
  Calculation:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  Button:{
    flex:6,
    flexDirection:'row',
    color:'white'
  },
  Number:{
    flex:3,
    backgroundColor:'#434343',
  },
  Opertion:{
    flex:1,
    backgroundColor:'#636363',
    justifyContent:'space-around',
  },
  Row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  Btn:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  BtnText:{
    fontSize:30,
    color:'white'
  }
});
