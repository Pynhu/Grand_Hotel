import Card from "../ui/Card";

const MenuCard = ({ item }: any) => {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 bg-gray-200">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 backdrop-blur-md bg-white/90 px-4 py-2 rounded-xl shadow-lg border border-white/20">
                    <span className="font-bold text-grand-navy">{item.price} zł</span>
                </div>

            </div>

            <div className="p-4">
                <h3 className="text-xl font-bold text-grand-navy mb-2">
                    {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                    {item.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-grand-slate">
                        {item.category}
                    </span>
                </div>
            </div>

        </Card>
    )
}
export default MenuCard