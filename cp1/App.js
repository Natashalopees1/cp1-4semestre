import HomeScreen from "./src/HomeSreen";
import QueryClientProvider from './src/QueryClientProvider'


export default function App() {
  return (
   <QueryClientProvider>
    <HomeScreen/>
   </QueryClientProvider>
  );
}

