import React, { useState, useEffect } from "react";
import {
  Instagram,
  MessageCircle,
  Phone,
  MapPin,
  Heart,
  Leaf,
  Cherry,
  Apple,
  Grape,
  Gift,
  Star,
  Truck,
  Clock,
  CheckCircle,
  ShoppingCart,
  Plus,
  Minus,
  X,
  Sparkles,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  type: "mermelada" | "aderezo";
}

interface CustomerInfo {
  name: string;
  address: string;
  city: string;
}

interface SalesData {
  [key: string]: number;
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState<string | null>(
    null
  );
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    address: "",
    city: "",
  });
  const [salesData, setSalesData] = useState<SalesData>(() => {
    const saved = localStorage.getItem("delMonteSales");
    return saved ? JSON.parse(saved) : {};
  });

  // Función para obtener etiquetas basadas en ventas
  const getProductBadges = (productId: string) => {
    const sales = salesData[productId] || 0;
    const badges = [];

    if (sales >= 50) {
      badges.push({
        text: "🏆 Bestseller",
        color: "from-yellow-400 to-orange-400",
        textColor: "text-white",
      });
    } else if (sales >= 30) {
      badges.push({
        text: "⭐ Favorito",
        color: "from-purple-400 to-pink-400",
        textColor: "text-white",
      });
    } else if (sales >= 15) {
      badges.push({
        text: "🔥 Popular",
        color: "from-red-400 to-pink-400",
        textColor: "text-white",
      });
    } else if (sales >= 10) {
      badges.push({
        text: "✨ Más Vendido",
        color: "from-blue-400 to-purple-400",
        textColor: "text-white",
      });
    }

    return badges;
  };

  // Función para actualizar ventas
  const updateSales = (productId: string, quantity: number) => {
    const newSalesData = {
      ...salesData,
      [productId]: (salesData[productId] || 0) + quantity,
    };
    setSalesData(newSalesData);
    localStorage.setItem("delMonteSales", JSON.stringify(newSalesData));
  };

  const mermeladas = [
    {
      id: "mora-fresa-kiwi",
      name: "Mora, fresa y kiwi",
      icon: <Grape className="w-8 h-8" />,
      color: "from-purple-200 to-pink-200",
      image:
        "/images/Imagen de WhatsApp 2025-07-11 a las 09.37.23_28589925.jpg",
      createdAt: "2025-07-9",
    },

    {
      id: "corozo",
      name: "Corozo",
      icon: <Cherry className="w-8 h-8" />,
      color: "from-orange-200 to-red-200",
      image:
        "/images/Imagen de WhatsApp 2025-07-11 a las 09.37.48_c61e50d1.jpg",
      createdAt: "2025-07-9",
    },

    {
      id: "naranja-gulupa-uchuva",
      name: "Naranja, gulupa y uchuva",
      icon: <Apple className="w-8 h-8" />,
      color: "from-yellow-200 to-orange-200",
      image:
        "/images/Imagen de WhatsApp 2025-07-11 a las 09.37.13_2c8e0e87.jpg",
      createdAt: "2025-07-9",
    },
    {
      id: "pina-maracuya-kiwi",
      name: "Piña, maracuyá y kiwi",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-200 to-yellow-200",
      image:
        "/images/Imagen de WhatsApp 2025-07-11 a las 09.37.36_18b6a8e4.jpg",
      createdAt: "2025-07-9",
    },
    {
      id: "mora-agraz",
      name: "Mora y agraz",
      icon: <Grape className="w-8 h-8" />,
      color: "from-indigo-200 to-purple-200",
      image:
        "/images/Imagen de WhatsApp 2025-07-11 a las 09.37.55_5c2da2a5.jpg",
      createdAt: "2025-07-9",
    },
    {
      id: "guayaba-menta",
      name: "Guayaba agria y menta",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-green-200 to-lime-200",
      image: "/images/Captura de pantalla 2025-07-19 214329.png",
      createdAt: "2025-07-20",
    },
  ];

  const aderezos = [
    {
      id: "dip-pimenton",
      name: "Dip de Pimentón",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-red-200 to-orange-200",
      image: "images/Imagen de WhatsApp 2025-07-11 a las 09.37.02_f1003ef3.jpg",
      createdAt: "2025-07-9",
    },
  ];

  const sizes = [
    { size: "120ml", price: 11000 },
    { size: "220ml", price: 14000 },
  ];

  const addToCart = (
    product: any,
    size: string,
    price: number,
    type: "mermelada" | "aderezo"
  ) => {
    const itemId = `${product.id}-${size}`;
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: itemId,
          name: product.name,
          size,
          price,
          quantity: 1,
          type,
        },
      ]);
    }

    setShowAddedAnimation(itemId);
    setTimeout(() => setShowAddedAnimation(null), 1000);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== itemId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    if (cart.length === 0) return "";

    let message = `¡Hola! Soy ${customerInfo.name} y me gustaría hacer el siguiente pedido de Sabores Del Monte:\n\n`;

    const mermeladasInCart = cart.filter((item) => item.type === "mermelada");
    const aderezosInCart = cart.filter((item) => item.type === "aderezo");

    if (mermeladasInCart.length > 0) {
      message += "🍓 *MERMELADAS:*\n";
      mermeladasInCart.forEach((item) => {
        message += `• ${item.name} (${item.size}) - Cantidad: ${
          item.quantity
        } - $${(item.price * item.quantity).toLocaleString()}\n`;
      });
      message += "\n";
    }

    if (aderezosInCart.length > 0) {
      message += "🌶️ *ADEREZOS:*\n";
      aderezosInCart.forEach((item) => {
        message += `• ${item.name} (${item.size}) - Cantidad: ${
          item.quantity
        } - $${(item.price * item.quantity).toLocaleString()}\n`;
      });
      message += "\n";
    }

    message += `💰 *TOTAL: $${getTotalPrice().toLocaleString()}*\n\n`;
    message += `📍 *DIRECCIÓN DE ENTREGA:*\n${customerInfo.address}\n${customerInfo.city}\n\n`;
    message +=
      "¿Podrías confirmarme la disponibilidad y el costo de envío? ¡Gracias!";

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    setShowCustomerForm(true);
  };

  const submitOrder = () => {
    if (!customerInfo.name || !customerInfo.address || !customerInfo.city) {
      alert("Por favor completa todos los campos");
      return;
    }

    // Actualizar estadísticas de ventas
    cart.forEach((item) => {
      const productId = item.id.split("-")[0]; // Extraer ID del producto sin el tamaño
      updateSales(productId, item.quantity);
    });

    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/573105960000?text=${message}`, "_blank");
    setShowCustomerForm(false);
    setCart([]);
    setCustomerInfo({ name: "", address: "", city: "" });
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/573117897305", "_blank");
  };

  useEffect(() => {
    // Trigger initial animations immediately
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        element.classList.add("animate-fade-in-up");
      });
    }, 100);

    const handleScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animate-fade-in-up");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const isNewProduct = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInDays = (now - created) / (1000 * 60 * 60 * 24);
  return diffInDays >= 0 && diffInDays <= 7;
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-300 to-pink-300 p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  Sabores Del Monte
                </h1>
                <p className="text-lg text-gray-800 font-semibold">
                  Mermeladas Artesanales
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:block">Contactar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/50 to-pink-100/50"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-12 animate-on-scroll">
            <div className="relative inline-block">
              <img
                src="images/Imagen de WhatsApp 2025-07-11 a las 09.38.49_1895d2f6.jpg"
                alt="Frascos de mermelada artesanal"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                <Sparkles className="w-5 h-5 inline mr-1" />
                ¡Artesanal!
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-on-scroll">
            Mermeladas y Aderezos
          </h2>
          <p className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium animate-on-scroll">
            Sabores naturales sin aditivos, hechos con amor en Medellín
          </p>
          <div className="flex justify-center space-x-6 animate-on-scroll">
            <div className="bg-green-100 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <div className="bg-pink-100 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
              <Heart className="w-8 h-8 text-pink-600" />
            </div>
            <div className="bg-yellow-100 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-on-scroll">
            Mermeladas Disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mermeladas.map((mermelada, index) => (
              <div
                key={mermelada.id}
                className="group animate-on-scroll h-full"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={mermelada.image}
                      alt={mermelada.name}
                      className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${mermelada.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      {mermelada.icon}
                    </div>
                    {/* Etiquetas del producto */}
                    <div className="absolute top-4 left-4 space-y-2 z-10">
                      {[
                        ...getProductBadges(mermelada.id),
                        ...(isNewProduct(mermelada.createdAt)
                          ? [
                              {
                                text: "¡Nuevo!",
                                color: "from-green-500 to-lime-500",
                                textColor: "text-white",
                                animate: "animate-bounce", // puedes cambiar a otra animación si deseas
                              },
                            ]
                          : []),
                      ].map((badge, index) => {
                        const animation = badge.animate ?? "animate-pulse"; // valor por defecto si no tiene
                        return (
                          <div
                            key={index}
                            className={`bg-gradient-to-r ${badge.color} ${badge.textColor} px-3 py-1 rounded-full text-xs font-bold shadow-lg ${animation}`}
                          >
                            {badge.text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Contenido fijo con altura mínima */}
                  <div className="p-6 min-h-[260px] flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        {mermelada.name}
                      </h4>
                      {salesData[mermelada.id] && (
                        <div className="text-center mb-3">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {salesData[mermelada.id]} vendidos
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      {sizes.map((sizeOption) => {
                        const isCorozo = mermelada.id === "corozo";
                        const customPrice = isCorozo
                          ? sizeOption.size === "120ml"
                            ? 12000
                            : 15000
                          : sizeOption.price;

                        return (
                          <div
                            key={sizeOption.size}
                            className="flex items-center justify-between bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div>
                              <span className="font-semibold text-gray-700">
                                {sizeOption.size}
                              </span>
                              <span className="text-2xl font-bold text-green-600 ml-3">
                                ${customPrice.toLocaleString()}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                addToCart(
                                  mermelada,
                                  sizeOption.size,
                                  customPrice,
                                  "mermelada"
                                )
                              }
                              className={`bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                                showAddedAnimation ===
                                `${mermelada.id}-${sizeOption.size}`
                                  ? "animate-pulse bg-green-500"
                                  : ""
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Agregar
                              </span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aderezos */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent animate-on-scroll">
            Aderezos
          </h3>
          <div className="max-w-md mx-auto">
            {aderezos.map((aderezo) => (
              <div key={aderezo.id} className="group animate-on-scroll">
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100">
                  <div className="relative">
                    <img
                      src={aderezo.image}
                      alt={aderezo.name}
                      className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${aderezo.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                    ></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      {aderezo.icon}
                    </div>
                    {/* Etiquetas de ventas para aderezos */}
                    <div className="absolute top-4 left-4 space-y-2">
                      {getProductBadges(aderezo.id).map((badge, badgeIndex) => (
                        <div
                          key={badgeIndex}
                          className={`bg-gradient-to-r ${badge.color} ${badge.textColor} px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse`}
                        >
                          {badge.text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                      {aderezo.name}
                    </h4>
                    {/* Mostrar número de ventas si hay */}
                    {salesData[aderezo.id] && (
                      <div className="text-center mb-3">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {salesData[aderezo.id]} vendidos
                        </span>
                      </div>
                    )}
                    <div className="space-y-3">
                      {sizes.map((sizeOption) => (
                        <div
                          key={sizeOption.size}
                          className="flex items-center justify-between bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div>
                            <span className="font-semibold text-gray-700">
                              {sizeOption.size}
                            </span>
                            <span className="text-2xl font-bold text-green-600 ml-3">
                              ${sizeOption.price.toLocaleString()}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              addToCart(
                                aderezo,
                                sizeOption.size,
                                sizeOption.price,
                                "aderezo"
                              )
                            }
                            className={`bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                              showAddedAnimation ===
                              `${aderezo.id}-${sizeOption.size}`
                                ? "animate-pulse bg-green-500"
                                : ""
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium">Agregar</span>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 text-center">
                      <p className="text-gray-700 font-medium text-sm">
                        ¡Próximamente más sabores!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Informaciones */}
      <section className="bg-yellow-100 py-10 px-6 rounded-xl shadow-lg mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            🎁 Tenemos el detalle perfecto para sorprender
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Ahora contamos con{" "}
            <strong>cajas especiales de mermeladas artesanales</strong>, ideales
            para regalar en cumpleaños, celebraciones, fechas especiales o
            simplemente para consentir a alguien que amas.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            Cada caja es <strong>única, natural y hecha con amor</strong>.
          </p>
          <p className="text-xl font-semibold text-amber-900">
            ¡Haz tu pedido y crea momentos inolvidables con sabor!
          </p>
        </div>
      </section>

      {/* Envíos y Pedidos */}
      <section className="py-20 px-4 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-on-scroll">
            Envíos y Pedidos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll">
              <div className="flex items-center mb-6">
                <div className="bg-red-100 p-3 rounded-full shadow-lg mr-4">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">Ubicación</h4>
              </div>
              <p className="text-gray-700 mb-6 text-lg">Medellín</p>
              <div className="space-y-4">
                <div className="flex items-center bg-blue-50 p-4 rounded-xl">
                  <Truck className="w-6 h-6 text-blue-500 mr-3" />
                  <span className="text-gray-700 font-medium">
                    Envíos a todo el Valle de Aburrá
                  </span>
                </div>
                <div className="flex items-center bg-green-50 p-4 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700 font-medium">
                    Cobertura nacional
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 rounded-2xl p-8 shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll">
              <div className="flex items-center mb-6">
                <div className="bg-pink-200 p-3 rounded-full shadow-lg mr-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800">
                  Personalización
                </h4>
              </div>
              <p className="text-gray-700 text-lg font-medium leading-relaxed">
                ¿Tienes un sabor en mente?
                <br />
                <span className="text-pink-600 font-bold">
                  ¡Lo preparamos a tu gusto!
                </span>
              </p>
              <div className="mt-6 flex space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <Sparkles className="w-5 h-5 text-pink-500" />
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <div className="mt-6">
                <button
                  onClick={handleWhatsAppContact}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-full text-lg font-bold flex items-center space-x-2 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Pedir Sabor Personalizado</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto y Redes Sociales */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-on-scroll">
            Contacto y Redes Sociales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll">
              <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Instagram className="w-10 h-10 text-pink-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">
                Instagram
              </h4>
              <p className="text-gray-600 text-lg">@sabor.delmonte</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll">
              <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Clock className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">TikTok</h4>
              <p className="text-gray-600 text-lg">@sabores.delmonte</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll">
              <div className="bg-gradient-to-r from-green-200 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <Phone className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-800">WhatsApp</h4>
              <p className="text-gray-600 text-lg">311 789 7305</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-3 rounded-full shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-2xl font-bold">Sabores Del Monte</h5>
          </div>
          <p className="text-gray-300 mb-6 text-lg">
            Mermeladas y Aderezos artesanales hechos con amor en Medellín
          </p>
          <div className="flex justify-center space-x-8">
            <div className="bg-green-500/20 p-2 rounded-full">
              <Leaf className="w-6 h-6 text-green-400" />
            </div>
            <div className="bg-pink-500/20 p-2 rounded-full">
              <Heart className="w-6 h-6 text-pink-400" />
            </div>
            <div className="bg-yellow-500/20 p-2 rounded-full">
              <Star className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center">
                <ShoppingCart className="w-6 h-6 mr-2" />
                Mi Carrito ({getTotalItems()})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                  <p className="text-gray-400">
                    ¡Agrega algunas mermeladas deliciosas!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.size} - ${item.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {item.type}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1 transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-800 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="bg-green-100 hover:bg-green-200 text-green-600 rounded-full p-1 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Pedir por WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Customer Info Modal */}
      {showCustomerForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Información de Entrega</h3>
              <button
                onClick={() => setShowCustomerForm(false)}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección completa *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.address}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Calle, carrera, número, apartamento"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, city: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tu ciudad"
                  />
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800">
                    Total del pedido:
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    ${getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {getTotalItems()} producto{getTotalItems() > 1 ? "s" : ""} en
                  tu carrito
                </p>
              </div>

              <button
                onClick={submitOrder}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
