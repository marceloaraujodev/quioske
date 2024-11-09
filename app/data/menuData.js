const menuData = {
  category: [
    {
      name: 'Bebidas Alcoólicas',
      subCategory: [
        {
          name: 'Cervejas',
          items: [
            {
              itemId: 1,
              name: 'Skol',
              price: 10.0,
              ml: 350,
              img: '/skol-lata.jpeg',
            },
            {
              itemId: 2,
              name: 'Brahma',
              price: 11.0,
              ml: 350,
              img: '/brahma-lata.jpeg',
            },
            {
              itemId: 3,
              name: 'Heineken',
              price: 9.0,
              ml: 350,
              img: '/heineken-lata.jpeg',
            },
            { itemId: 4, name: 'Skol', price: 10.0, ml: 350, img: '/skol-600.jpg' },
            { itemId: 5, name: 'Brahma', price: 11.0, ml: 350, img: '/brahma-600.jpg' },
            { itemId: 6, name: 'Heineken', price: 9.0, ml: 350, img: '/heineken-600.webp' },
          ],
        },
        {
          name: 'Caipirinhas',
          items: [
            { itemId: 12, name: 'Limão', price: 18.0, ml: 300 },
            { itemId: 13, name: 'Morango', price: 20.0, ml: 300 },
            { itemId: 14, name: 'kiwi', price: 20.0, ml: 300 },
          ],
        },
      ],
    },
    {
      name: 'Entradas',
      subCategory: [
        {
          name: 'Frios',
          items: [
            {
              itemId: 7,
              name: 'Queijo',
              price: 20.0,
              description: 'Assorted cheeses',
            },
            {
              itemId: 8,
              name: 'Salame',
              price: 18.0,
              description: 'Italian salami',
            },
          ],
        },
        {
          name: 'Quentes',
          items: [
            {
              itemId: 9,
              name: 'Bolinho de Bacalhau',
              price: 22.0,
              description: 'Codfish balls',
            },
          ],
        },
      ],
    },
    {
      name: 'Porções',
      subCategory: [
        {
          name: 'Grandes',
          items: [
            {
              itemId: 11,
              name: 'Batata Frita',
              price: 30.0,
              description: 'French fries',
            }
          ],
        },
        {
          name: 'Pequenas',
          items: [
            {
              itemId: 10,
              name: 'Frango a Passarinho',
              price: 25.0,
              description: 'Fried chicken',
            }
          ],
        },
        {
          name: 'Quentes',
          items: [
            {
              itemId: 9,
              name: 'Bolinho de Bacalhau',
              price: 22.0,
              description: 'Codfish balls',
            },
          ],
        },
      ],
    },
  ],
};

export default menuData