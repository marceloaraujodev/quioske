export default async function createMenu(menuData) {
  console.log('menudata inside create func', menuData);

  // console.log(session);
  const res = await axios.post('/api/createmenu', {
    session,
    menu: menuData,
  });
  console.log(res);
}