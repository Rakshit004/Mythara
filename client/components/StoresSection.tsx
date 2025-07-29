interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
}

const stores: Store[] = [
  {
    id: '1',
    name: 'DELHI STORE',
    address: 'M-81, Ground floor, M block market, Greater Kailash II, Delhi 110048',
    phone: '+91 9599191998',
    image: 'https://cdn.shopify.com/s/files/1/0514/9494/4962/files/delhi_store.jpg?v=1705598077'
  },
  {
    id: '2',
    name: 'MUMBAI STORE',
    address: 'B1, Prem Sagar Building, 14th Rd, Khar, Khar West, Mumbai, Maharashtra 400052',
    phone: '+91 9599199537',
    image: 'https://cdn.shopify.com/s/files/1/0514/9494/4962/files/Mumbai_store_02.jpg?v=1705599470'
  },
  {
    id: '3',
    name: 'HYDERABAD STORE',
    address: '101, Vimbri Boulevard, Street No. 4, Green Valley, Banjara Hills, Hyderabad, Telangana 500034',
    phone: '+91 95991 98004',
    image: 'https://cdn.shopify.com/s/files/1/0514/9494/4962/files/HYD_STORE01.jpg?v=1705598687'
  },
  {
    id: '4',
    name: 'AHMEDABAD STORE',
    address: 'One42, G10, 11ABC Ln, Ashok Vatika, Ahmedabad, Gujarat 380058',
    phone: '+91 92668 66286',
    image: 'https://cdn.shopify.com/s/files/1/0514/9494/4962/files/IMG_0440.jpg?v=1728772670'
  },
  {
    id: '5',
    name: 'GURUGRAM STORE',
    address: 'F-149, First Floor, Ambience Mall, NH- 8, Sector 24, Gurugram, Haryana 122002',
    phone: '+91 92668 66296',
    image: 'https://cdn.shopify.com/s/files/1/0514/9494/4962/files/ggn_store_bluorng.jpg?v=1737715951'
  }
];

export default function StoresSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">OUR STORES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {stores.map((store) => (
            <div key={store.id} className="text-center">
              <img 
                src={store.image} 
                alt={store.name} 
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-bold text-lg mb-2">{store.name}</h3>
              <p className="text-gray-600 mb-2">{store.address}</p>
              <p className="text-gray-600">{store.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
