import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Минималистичный диван",
      price: 89990,
      image: "/img/db5cb23a-c010-4c3f-b99d-dedd737d3a1a.jpg",
      description: "Современный диван в скандинавском стиле"
    },
    {
      id: 2,
      name: "Обеденный стол",
      price: 45990,
      image: "/img/ebf34904-788e-4d51-9e45-433ac17fb02b.jpg",
      description: "Деревянный стол из натурального дуба"
    },
    {
      id: 3,
      name: "Рабочее кресло",
      price: 29990,
      image: "/img/075ecd2f-00c6-428d-84cf-14b9dbe62337.jpg",
      description: "Эргономичное кресло для работы"
    }
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-black">МЕБЕЛЬ</h1>
              <nav className="hidden md:flex space-x-8">
                <a href="#catalog" className="text-gray-600 hover:text-black transition-colors">Каталог</a>
                <a href="#about" className="text-gray-600 hover:text-black transition-colors">О нас</a>
                <a href="#delivery" className="text-gray-600 hover:text-black transition-colors">Доставка</a>
                <a href="#contacts" className="text-gray-600 hover:text-black transition-colors">Контакты</a>
              </nav>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative"
            >
              <Icon name="ShoppingCart" size={20} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-black mb-6">
            Минималистичная мебель
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Чистые линии и современный дизайн для вашего дома
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Products Catalog */}
      <section id="catalog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-black mb-12 text-center">Каталог</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-50 rounded-t-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-black mb-2">{product.name}</h4>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-black">
                        {product.price.toLocaleString()} ₽
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-white text-black border border-black hover:bg-black hover:text-white transition-colors"
                      >
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-black mb-8">О нас</h3>
          <p className="text-lg text-gray-600 mb-6">
            Мы создаем мебель, которая воплощает принципы минимализма и функциональности. 
            Каждое изделие тщательно продумано и выполнено из качественных материалов.
          </p>
          <p className="text-lg text-gray-600">
            Наша миссия — сделать ваш дом более уютным и стильным с помощью современного дизайна.
          </p>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-black mb-12 text-center">Доставка</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-black" />
              <h4 className="text-xl font-bold text-black mb-2">Быстрая доставка</h4>
              <p className="text-gray-600">Доставим в течение 3-5 рабочих дней</p>
            </div>
            <div className="text-center">
              <Icon name="Shield" size={48} className="mx-auto mb-4 text-black" />
              <h4 className="text-xl font-bold text-black mb-2">Гарантия качества</h4>
              <p className="text-gray-600">2 года гарантии на всю мебель</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-black mb-8">Контакты</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Icon name="Phone" size={24} className="mx-auto mb-2 text-black" />
              <p className="text-gray-600">+7 (495) 123-45-67</p>
            </div>
            <div>
              <Icon name="Mail" size={24} className="mx-auto mb-2 text-black" />
              <p className="text-gray-600">info@mebel.ru</p>
            </div>
            <div>
              <Icon name="MapPin" size={24} className="mx-auto mb-2 text-black" />
              <p className="text-gray-600">Москва, ул. Примерная, 123</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-bold text-black">Корзина</h3>
              <Button variant="ghost" onClick={() => setIsCartOpen(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center">Корзина пуста</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 mb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-black">{item.name}</h4>
                        <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                        <p className="font-bold text-black">{(item.price * item.quantity).toLocaleString()} ₽</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash" size={16} />
                      </Button>
                    </div>
                  ))}
                  <Separator className="my-4" />
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-black">Итого:</span>
                    <span className="text-lg font-bold text-black">{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Оформить заказ
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 МЕБЕЛЬ. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;