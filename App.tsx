
import React, {useState} from 'react';
import {Modal, KeyboardAvoidingView, TextInput, StyleSheet,  Text,  View,TouchableOpacity,Keyboard} from 'react-native';
import Task from './components/Task';

export default function app(){
   const [task, settask]= useState();
   const [taskItems, setTaskItems]=useState([]);
   const [addpopup, showAddPopup]= useState(false);
   const [deletepopup, showDeletePopup]= useState(false);

   const handleaddTask= () => {
   Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    settask(null);
   showAddPopup(true);
   setTimeout(() => showAddPopup(false), 1500);
   };

   const completeTask= (index)=> {
   let itemCopy= [...taskItems];
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
    showDeletePopup(true);
    setTimeout(() => showDeletePopup(false),1500 );
   }
   const getTodayDate = () => {
   const today = new Date();
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return today.toLocaleDateString(undefined, options);
       };
    return(

    <View style={styles.container}>
        <View style={styles.TaskWrapper}>
            <Text style={styles.titleSection} >Today's tasks </Text>
            <Text style={styles.todayDate}>{getTodayDate()}</Text>

            <View style={styles.items}>
            {
            taskItems.map( (item, index) => {
            return (
             <TouchableOpacity key={index} onPress={()=> completeTask(index)}>
              <Task  text={item}/>
             </TouchableOpacity>
          )})
            }

            </View>
        </View>

        <KeyboardAvoidingView
        behavior={Platform.OS=='iso' ? "padding": "height"}
        style={styles.writeTextWrapper}
        >
        <TextInput style={styles.input} placeholder={'write a text'} valus={task} onChangeText ={text => settask(text)}/>
        <TouchableOpacity>
            <View style={styles.addWrapper}>
            <Text style={styles.addText} onPress={()=> handleaddTask()}>+</Text>
            </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      <Modal visible={addpopup} transparent animationType="fade">
        <View style={styles.popup}>
            <Text style={styles.popupText}>Task added!</Text>
        </View>
        </Modal>
        <Modal visible={deletepopup} transparent animationType="fade">
        <View style={styles.popup}>
            <Text style={styles.popupText}>Task deleted!</Text>
        </View>
        </Modal>
    </View>
    );
};
const styles =StyleSheet.create({
    container:{
    flex: 1,
    backgroundColor: '#E8EAED',
    },
    TaskWrapper:{
    paddingTop: 80,
    padingHorizantal: 20,
    },
    titleSection:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',

    },
     todayDate:{
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
              },
    items:{
    marginTop:30,
    marginLeft:10,
    marginRight:10,
    },
     writeTextWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
      },
      addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
      },
      addText: {},
     popup: {
        backgroundColor: '#000000',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        top: '50%',
        },
        popupText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: 'bold',
        },

});

