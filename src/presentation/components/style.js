import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  title: {
    flex:1,
    backgroundColor: 'darkblue',
    color: 'white',
    margin: 0,
    padding: 8,
    textAlign: 'center'
  },
  navBack:{
    textAlign: 'left'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    margin:3
  },
  ordersAll: {

  },
  ordersList: {

  },
  order: {
    flexDirection: 'row'
  },
  coffee:{
    flex:1,
    justifyContent: 'space-around'
  },
  fill:{
    flex: 1
  },
  coffeesList:{

  },
  coffeeStyle:{

  },
  addButton: {
    flex: 1;
    justifyContent: 'flex-end';
    margin: 8;
    padding: 8;
  },
  orderRow:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    padding: 4
  },
  orderName: {
    fontWeight: 'bold'
  },
  formCardContainer:{
    margin: 8,
  },
  formCard: {
    width:'100%',
    padding: 6,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16
  },
  loading: {
    color: 'gray',
    textAlign: 'center'
  },
  noCard: {
    flex:1,
    borderWidth: 1,
    borderColor: 'transparent',
    margin: 8,
    padding: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 8,
    padding: 8,
  },
  deleteCard: {
    width : 50
  }
});
