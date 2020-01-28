
const INITIAL_STATE = {
  orderMenu:[
    {
      title:'咖啡',
      rowKey:'coffee'
    },
    {
      title:'茶',
      rowKey:'tea'
    },
    {
      title:'冷饮',
      rowKey:'coldDrinks'
    },
    {
      title:'三明治',
      rowKey:'sandWichs'
    },
  ],
  exploreMenu:[
    {
      title:'菜单',
      rowKey:'fullMenu'
    },
    {
      title:'产品',
      rowKey:'products'
    },
    {
      title:'门店',
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
