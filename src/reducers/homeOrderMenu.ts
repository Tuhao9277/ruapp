
const INITIAL_STATE = {
  orderMenu:[
    {
      title:'Coffee',
      rowKey:'coffee'
    },
    {
      title:'Tea',
      rowKey:'tea'
    },
    {
      title:'Cold Drinks',
      rowKey:'coldDrinks'
    },
    {
      title:'Sandwichs',
      rowKey:'sandWichs'
    },
  ],
  exploreMenu:[
    {
      title:'Full Menu',
      rowKey:'fullMenu'
    },
    {
      title:'Products',
      rowKey:'products'
    },
    {
      title:'Branche',
      rowKey:'branche'
    },
  ]
}

export default function orderTab (state = INITIAL_STATE, action) {
  switch (action.type) {
     default:
       return state
  }
}
