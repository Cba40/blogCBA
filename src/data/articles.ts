import { Article } from '../types/Article';

export const featuredArticle: Article = {
  id: '1',
  title: 'Revolución de la IA Generativa: GPT-5 y el Futuro de la Inteligencia Artificial',
  excerpt: 'Exploramos los avances más recientes en inteligencia artificial generativa, desde GPT-5 hasta las implicaciones éticas y económicas que transformarán nuestra sociedad en los próximos años.',
  content: `
La llegada de GPT-5 marca un hito en la historia de la inteligencia artificial. Este modelo no solo entiende el lenguaje, sino que puede generar código, redactar textos creativos, debatir ideas y hasta razonar con cierta lógica.

Con más de 1000 mil millones de parámetros, GPT-5 supera a sus predecesores en coherencia, precisión y capacidad de contexto. Puede mantener conversaciones largas sin perder el hilo, lo que lo hace ideal para aplicaciones empresariales, educación y atención al cliente.

Sin embargo, su poder también plantea desafíos éticos. La desinformación automatizada, el sesgo algorítmico y la automatización de trabajos creativos son preocupaciones reales que requieren regulación y conciencia.

En CBA 4.0 Blog, creemos que la clave está en el uso responsable. La IA no reemplazará a los humanos, pero sí a quienes no sepan usarla.
  `,
  author: 'Walter Camino',
  date: '11 Ago 2025',
  readTime: 8,
  category: 'ia',
  image: '/imagenes/ImagenesArticulos/articulo1.webp',
  featured: true
};

export const blogArticles: Article[] = [
  featuredArticle,
  {
    id: '2',
    title: 'Samsung Galaxy S25 Ultra: Reseña Completa del Flagship 2025',
    excerpt: 'Análisis exhaustivo del nuevo Samsung Galaxy S25 Ultra con S Pen integrado, cámaras de 200MP y la nueva tecnología de pantalla AMOLED 2.0.',
    content: `
Samsung ha vuelto a romper récords con el lanzamiento del Galaxy S25 Ultra. Este smartphone no solo mejora en diseño y rendimiento, sino que redefine la experiencia del usuario con una S Pen completamente integrada, sin necesidad de slot ni pérdida.

Su cámara principal de 200 megapíxeles, apoyada por IA de procesamiento de imagen, captura detalles impresionantes incluso en condiciones de poca luz. El modo nocturno es ahora tan potente que compite con cámaras profesionales.

La pantalla AMOLED 2.0 reduce el consumo energético en un 30% y ofrece una tasa de refresco adaptativa de hasta 180 Hz, ideal para gamers y usuarios exigentes.

Con una batería de 5000 mAh, carga rápida de 65W y resistencia IP68, el S25 Ultra es una bestia de ingeniería. Si buscás el mejor Android del mercado, este es tu dispositivo.
  `,
    author: 'Nicolás Figueroa',
    date: '10 Ago 2025',
    readTime: 6,
    category: 'gadgets',
    image: '/imagenes/ImagenesArticulos/articulo2.webp'
  },
  {
    id: '3',
    title: 'IoT para PyMEs: Automatización Inteligente sin Grandes Inversiones',
    excerpt: 'Descubre cómo implementar soluciones IoT accesibles para pequeñas y medianas empresas, optimizando procesos y reduciendo costos operativos.',
    content: `
El Internet de las Cosas (IoT) ya no es un lujo para grandes empresas. Hoy, PyMEs pueden implementar soluciones IoT accesibles para monitorear inventarios, controlar el consumo energético o supervisar procesos productivos en tiempo real.

Sensores inalámbricos, conectividad 5G y plataformas de análisis en la nube permiten automatizar tareas que antes requerían personal dedicado. El retorno de inversión es rápido: hasta un 25% de ahorro operativo en el primer año.

En Córdoba, empresas como AgroTech Solutions ya usan sensores IoT para optimizar el riego en cultivos, ahorrando agua y aumentando rendimientos.

El futuro es claro: la digitalización no es opcional. Y con el apoyo de hubs tecnológicos como CBA 4.0, las PyMEs pueden competir en igualdad de condiciones.
  `,
    author: 'Cecilia Cogot',
    date: '9 Ago 2025',
    readTime: 7,
    category: 'iot',
    image: '/imagenes/ImagenesArticulos/articulo3.webp'
  },
  {
    id: '4',
    title: 'React 19: Las Nuevas Características que Cambiarán tu Desarrollo',
    excerpt: 'Exploramos las funciones más esperadas de React 19, incluyendo Server Components, Suspense mejorado y las nuevas APIs para concurrent rendering.',
    content: `
React 19 está a punto de cambiar para siempre la forma en que desarrollamos aplicaciones web. Con la introducción oficial de Server Components, ahora podemos renderizar componentes en el servidor sin sacrificar la interactividad del cliente.

Suspense mejora drásticamente la carga de datos, permitiendo mostrar contenido antes de que todos los recursos estén listos. Y las nuevas APIs para concurrent rendering permiten una experiencia de usuario más fluida, incluso en dispositivos de gama media.

Además, React 19 simplifica el manejo de estados con nuevos hooks y mejora el rendimiento general de las apps.

Para los desarrolladores, esta versión es una revolución: más velocidad, menos código y mejor experiencia de usuario. En CBA 4.0 Blog, ya estamos probando sus nuevas funciones en proyectos reales.
  `,
    author: 'Diego Martínez',
    date: '8 Ago 2025',
    readTime: 5,
    category: 'software',
    image: '/imagenes/ImagenesArticulos/articulo4.webp'
  },
  {
    id: '5',
    title: 'Ciberseguridad 2025: Amenazas Emergentes y Estrategias de Protección',
    excerpt: 'Las últimas tendencias en ciberseguridad, desde ataques con IA hasta estrategias de Zero Trust Architecture para empresas modernas.',
    content: `
El panorama de la ciberseguridad en 2025 es más complejo que nunca. Los atacantes ahora usan inteligencia artificial para crear malware más evasivo, phishing altamente personalizado y ataques automatizados a escala.

Frente a esto, las empresas adoptan la arquitectura Zero Trust: "nunca confíes, siempre verifica". Cada acceso, interno o externo, debe autenticarse y autorizarse continuamente.

Además, la autenticación biométrica, el cifrado de extremo a extremo y los sistemas de detección de anomalías con IA son ahora estándares en empresas líderes.

En Argentina, el 60% de las PyMEs sufrieron al menos un ataque en 2024. La conciencia y la inversión en seguridad ya no son opcionales: son una necesidad estratégica.
  `,
    author: 'Ana González',
    date: '7 Ago 2025',
    readTime: 9,
    category: 'software',
    image: '/imagenes/ImagenesArticulos/articulo5.jpeg'
  },
  {
    id: '6',
    title: 'Apple Vision Pro 2: Realidad Mixta Accesible para el Consumidor',
    excerpt: 'Apple reduce el precio de su headset de realidad mixta y agrega nuevas funciones que prometen revolucionar la experiencia inmersiva.',
    content: `
Apple ha dado un paso gigantesco con el Vision Pro 2: reduce el precio en un 30% y mejora el tiempo de batería, haciendo que la realidad mixta sea accesible para más consumidores.

Con un nuevo modo "Entorno" que permite ver el mundo real con capas digitales superpuestas, el dispositivo ya no es solo para juegos, sino para productividad, educación y teletrabajo.

Los desarrolladores ya están creando apps que aprovechan sus sensores de seguimiento ocular y reconocimiento de gestos. Pronto podrás controlar tu Mac con la mirada.

En CBA 4.0 Blog, creemos que el Vision Pro 2 no es solo un producto, es el inicio de una nueva forma de interactuar con la tecnología.
  `,
    author: 'Carlos Ruiz',
    date: '6 Ago 2025',
    readTime: 6,
    category: 'gadgets',
    image: '/imagenes/ImagenesArticulos/articulo6.jpeg'
  },
  {
    id: '7',
    title: 'Edge Computing: Procesamiento en Tiempo Real para la Nueva Era',
    excerpt: 'Cómo la computación en el borde está transformando industrias desde la manufactura hasta el entretenimiento con latencia ultrabaja.',
    content: `
La computación en el borde (Edge Computing) está revolucionando cómo procesamos datos. En lugar de enviar todo al cloud, el procesamiento se hace cerca del origen: en fábricas, ciudades inteligentes o incluso en tu auto.

Esto reduce la latencia a milisegundos, esencial para aplicaciones críticas: cirugías remotas, vehículos autónomos o sistemas de seguridad industrial.

En la industria 4.0, sensores en tiempo real monitorean máquinas y predicen fallas antes de que ocurran. En el entretenimiento, Edge permite streaming 8K sin buffering.

Con el crecimiento del 5G y los dispositivos IoT, el Edge Computing no es el futuro: ya está aquí. Y promete una era de respuestas instantáneas y eficiencia sin precedentes.
  `,
    author: 'María López',
    date: '5 Ago 2025',
    readTime: 7,
    category: 'iot',
    image: '/imagenes/ImagenesArticulos/articulo7.webp'
  },
  {
    id: '8',
    title: 'Blockchain para PyMEs: Más Allá de las Criptomonedas',
    excerpt: 'Aplicaciones prácticas de blockchain en pequeñas empresas: trazabilidad, contratos inteligentes y sistemas de identidad descentralizados.',
    content: `
Blockchain no es solo Bitcoin. Para las PyMEs, ofrece soluciones reales: trazabilidad de productos, contratos inteligentes que se ejecutan automáticamente y sistemas de identidad seguros y descentralizados.

Una pyme agrícola puede usar blockchain para probar el origen orgánico de sus productos. Una consultora puede automatizar pagos con contratos que se activan al entregar un informe.

En Argentina, empresas como AgroChain ya usan esta tecnología para ganar confianza en mercados internacionales.

El costo de entrada ha bajado, y plataformas como Polygon o Hedera ofrecen redes rápidas y económicas. Blockchain ya no es ciencia ficción: es una herramienta de competitividad.
  `,
    author: 'Roberto Silva',
    date: '4 Ago 2025',
    readTime: 8,
    category: 'software',
    image: '/imagenes/ImagenesArticulos/articulo8.jpeg'
  },
  {
    id: '9',
    title: 'Quantum Computing: IBM Presenta su Procesador de 1000 Qubits',
    excerpt: 'El nuevo chip cuántico de IBM promete resolver problemas complejos en criptografía, medicina y simulación molecular.',
    content: `
IBM acaba de lanzar su nuevo procesador cuántico de 1000 qubits, un salto exponencial respecto a generaciones anteriores. Este chip no solo es más potente, sino más estable, reduciendo los errores cuánticos.

Aplicaciones que antes tardaban años ahora podrían resolverse en horas: simulación de moléculas para nuevos fármacos, optimización de rutas logísticas o ruptura de códigos criptográficos.

Aunque aún está lejos del uso masivo, universidades y empresas ya acceden a estos sistemas vía cloud para experimentar.

En CBA 4.0 Blog, seguimos de cerca este avance. El cómputo cuántico no reemplazará a los clásicos, pero abrirá puertas a problemas que hoy consideramos imposibles de resolver.
  `,
    author: 'Laura Mendoza',
    date: '3 Ago 2025',
    readTime: 10,
    category: 'ia',
    image: '/imagenes/ImagenesArticulos/articulo9.webp'
  }
];