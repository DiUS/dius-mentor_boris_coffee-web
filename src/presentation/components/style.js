import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  title: {
    flex:1,
    backgroundColor: 'darkblue',
    color: 'white',
    margin: '0',
    padding: '0.5rem',
    textAlign: 'center'
  },
  navBack:{
    textAlign: 'left'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    margin:'0.2rem'
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
  orderRow:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    padding: '0.3rem'
  },
  orderName: {
    fontWeight: 'bold'
  },
  formCardContainer:{
    margin: '0.5rem',
  },
  formCard: {
    width:'100%',
    padding: '0.45rem',
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: '1.0rem'
  },
  loading: {
    color: 'gray',
    textAlign: 'center'
  },
  noCard: {
    flex:1,
    borderWidth: 1,
    borderColor: 'transparent',
    margin: '0.5rem',
    padding: '0.5rem',
  },
  card: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: '0.5rem',
    padding: '0.5rem',
  },
  deleteCard: {
    width : 50
  }
});
