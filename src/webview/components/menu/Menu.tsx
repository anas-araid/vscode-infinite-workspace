// import { Command } from 'cmdk';
// import React = require("react");

// const Menu = () => {
//   const [open, setOpen] = React.useState(false);

//   // Toggle the menu when ⌘K is pressed
//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       console.log('e.key', e.key);
//       console.log('e.metaKey', e.metaKey);
      
//       if (e.key === 'm' && e.metaKey) {
//         console.log('dentro');
        
//         setOpen(true);
//         // setOpen((open) => !open);
//       }
//     };

//     document.addEventListener('keydown', down);
//     return () => document.removeEventListener('keydown', down);
//   }, []);
//   return (
//     <Command.Dialog open={open} onOpenChange={setOpen}>
//       <Command.Input />

//       <Command.List>
//         {/* {loading && <Command.Loading>Hang on…</Command.Loading>} */}

//         <Command.Empty>No results found.</Command.Empty>

//         <Command.Group heading="Fruits">
//           <Command.Item>Apple</Command.Item>
//           <Command.Item>Orange</Command.Item>
//           <Command.Separator />
//           <Command.Item>Pear</Command.Item>
//           <Command.Item>Blueberry</Command.Item>
//         </Command.Group>

//         <Command.Item>Fish</Command.Item>
//       </Command.List>
//     </Command.Dialog>
//   );
// };

// export default Menu;