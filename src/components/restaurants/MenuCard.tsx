import Card from "../ui/Card";

const MenuCard = ({ item }: any) => {
    return (
        <Card className="p-4 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-grand-navy">{item.name}</h3>
                <span className="font-bold text-grand-gold">{item.price} zł</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-grand-slate">
                {item.category}
            </span>
        </Card>
    )
}
export default MenuCard