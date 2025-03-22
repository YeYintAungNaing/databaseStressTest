import db from "../src/db"

// I totally did all the mapping myself...... trust me
const categoryMap = {
    "Motorbike Boots & Luggage": "Automotive & Accessories",
    "Snowboard Bindings": "Sports & Outdoors",
    "General Music-Making Accessories": "Musical Instruments",
    "Mattress Pads & Toppers": "Home & Living",
    "Hair Care": "Health & Personal Care",
    "Internal TV Tuner & Video Capture Cards": "Electronics",
    "String Lights": "Home & Living",
    "Motorbike Lighting": "Automotive & Accessories",
    "Kids' Art & Craft Supplies": "Toys & Hobbies",
    "Computer Printers": "Electronics",
    "Table Tennis": "Sports & Outdoors",
    "Smart Home Security & Lighting": "Electronics",
    "Professional Medical Supplies": "Health & Personal Care",
    "Darts & Dartboards": "Sports & Outdoors",
    "Flashes": "Photography & Videography",
    "Test & Measurement": "Industrial & Tools",
    "Cutting Tools": "Industrial & Tools",
    "Ironing & Steamers": "Home & Living",
    "Small Kitchen Appliances": "Home & Living",
    "Fragrances": "Health & Personal Care",
    "Household Batteries, Chargers & Accessories": "Electronics",
    "Piano & Keyboard": "Musical Instruments",
    "Handmade Home DÃ©cor": "Home & Living",
    "Decking & Fencing": "Home & Garden",
    "USB Gadgets": "Electronics",
    "Handmade Home & Kitchen Products": "Home & Living",
    "Tableware": "Home & Living",
    "Power Supplies": "Electronics",
    "Bass Guitars & Gear": "Musical Instruments",
    "Home Audio Record Players": "Electronics",
    "Motorbike Handlebars, Controls & Grips": "Automotive & Accessories",
    "Electronic Toys": "Toys & Hobbies",
    "Mowers & Outdoor Power Tools": "Home & Garden",
    "Industrial Electrical": "Industrial & Tools",
    "Motorbike Batteries": "Automotive & Accessories",
    "Furniture & Lighting": "Home & Living",
    "Health & Personal Care": "Health & Personal Care",
    "Tablet Accessories": "Electronics",
    "Computer Audio & Video Accessories": "Electronics",
    "PC & Video Games": "Electronics",
    "Film Cameras": "Photography & Videography",
    "Handmade Baby Products": "Baby & Kids",
    "Fireplaces, Stoves & Accessories": "Home & Living",
    "External Optical Drives": "Electronics",
    "Portable Sound & Video Products": "Electronics",
    "Scanners & Accessories": "Electronics",
    "Motorbike Electrical & Batteries": "Automotive & Accessories",
    "Living Room Furniture": "Home & Living",
    "Computer Screws": "Electronics",
    "Kids' Play Figures": "Toys & Hobbies",
    "Doormats": "Home & Living",
    "Calendars & Personal Organisers": "Office & Stationery",
    "Bakeware": "Home & Living",
    "Downhill Ski Boots": "Sports & Outdoors",
    "Sports & Outdoors": "Sports & Outdoors",
    "Learning & Education Toys": "Toys & Hobbies",
    "Desktop PCs": "Electronics",
    "Outdoor Rope Lights": "Home & Living",
    "Bedding Collections": "Home & Living",
    "Computers, Components & Accessories": "Electronics",
    "Building Supplies": "Home & Garden",
    "Grocery": "Grocery & Gourmet",
    "Climbing Footwear": "Sports & Outdoors",
    "Computer & Server Racks": "Electronics",
    "Bedroom Furniture": "Home & Living",
    "Children's Bedding": "Home & Living",
    "USB Hubs": "Electronics",
    "Safety & Security": "Electronics",
    "Drums & Percussion": "Musical Instruments",
    "Home Office Furniture": "Home & Living",
    "3D Printing & Scanning": "Electronics",
    "Window Treatments": "Home & Living",
    "Thermometers & Meteorological Instruments": "Industrial & Tools",
    "Network Cards": "Electronics",
    "PA & Stage": "Musical Instruments",
    "Birthday Gifts": "Gifts & Occasions",
    "Hallway Furniture": "Home & Living",
    "Power & Hand Tools": "Industrial & Tools",
    "Laptop Accessories": "Electronics",
    "Cookware": "Home & Living",
    "GPS, Finders & Accessories": "Automotive & Accessories",
    "DJ & VJ Equipment": "Musical Instruments",
    "Hardware": "Industrial & Tools",
    "Decorative Home Accessories": "Home & Living",
    "Handmade Clothing, Shoes & Accessories": "Fashion & Apparel",
    "Wind Instruments": "Musical Instruments",
    "Baby": "Baby & Kids",
    "Internal Optical Drives": "Electronics",
    "Handmade Kitchen & Dining": "Home & Living",
    "External TV Tuners & Video Capture Cards": "Electronics",
    "Laptops": "Electronics",
    "Ski Goggles": "Sports & Outdoors",
    "Electrical": "Industrial & Tools",
    "I/O Port Cards": "Electronics",
    "Radios & Boomboxes": "Electronics",
    "Computer Cases": "Electronics",
    "Motorbike Drive & Gears": "Automotive & Accessories",
    "Digital Cameras": "Photography & Videography",
    "External Sound Cards": "Electronics",
    "Snowboard Boots": "Sports & Outdoors",
    "Bathroom Furniture": "Home & Living",
    "Slipcovers": "Home & Living",
    "Arts & Crafts": "Arts & Crafts",
    "Golf Shoes": "Sports & Outdoors",
    "Car & Motorbike": "Automotive & Accessories",
    "Agricultural Equipment & Supplies": "Industrial & Tools",
    "Bedding & Linen": "Home & Living",
    "Storage & Home Organisation": "Home & Living",
    "Vases": "Home & Living",
    "Hiking Hand & Foot Warmers": "Sports & Outdoors",
    "Made in Italy Handmade": "Fashion & Apparel",
    "Uninterruptible Power Supply Units & Accessories": "Electronics",
    "Trampolines & Accessories": "Sports & Outdoors",
    "PC Gaming Accessories": "Electronics",
    "Mirrors": "Home & Living",
    "Microphones": "Musical Instruments",
    "Snowboards": "Sports & Outdoors",
    "Home Fragrance": "Home & Living",
    "Motherboards": "Electronics",
    "Binoculars, Telescopes & Optics": "Photography & Videography",
    "Signs & Plaques": "Home & Living",
    "Boxes & Organisers": "Home & Living",
    "Home Bar Furniture": "Home & Living",
    "Networking Devices": "Electronics",
    "CPUs": "Electronics",
    "Storage & Organisation": "Home & Living",
    "Karaoke Equipment": "Musical Instruments",
    "Hi-Fi & Home Audio Accessories": "Electronics",
    "Streaming Clients": "Electronics",
    "Sports Toys & Outdoor": "Toys & Hobbies",
    "Material Handling Products": "Industrial & Tools",
    "Girls": "Fashion & Apparel",
    "Downhill Skis": "Sports & Outdoors",
    "Abrasive & Finishing Products": "Industrial & Tools",
    "Torches": "Electronics",
    "String Instruments": "Musical Instruments",
    "Manicure & Pedicure Products": "Health & Personal Care",
    "Professional Education Supplies": "Office & Stationery",
    "Smart Speakers": "Electronics",
    "Surveillance Cameras": "Electronics",
    "Printers & Accessories": "Electronics",
    "Headphones & Earphones": "Electronics",
    "Kitchen Linen": "Home & Living",
    "Bowling": "Sports & Outdoors",
    "Soft Toys": "Toys & Hobbies",
    "Men": "Fashion & Apparel",
    "Decorative Artificial Flora": "Home & Living",
    "Cricket Shoes": "Sports & Outdoors",
    "Adapters": "Electronics",
    "Make-up": "Health & Personal Care",
    "Garden Tools & Watering Equipment": "Home & Garden",
    "Hard Drive Accessories": "Electronics",
    "Camera & Photo Accessories": "Photography & Videography",
    "Packaging & Shipping Supplies": "Industrial & Tools",
    "Ballet & Dancing Footwear": "Fashion & Apparel",
    "Beer, Wine & Spirits": "Food & Beverage",
    "Barebone PCs": "Electronics",
    "Cables & Accessories": "Electronics",
    "Plugs": "Electronics",
    "Kitchen & Bath Fixtures": "Home & Living",
    "Graphics Cards": "Electronics",
    "Garden Storage & Housing": "Home & Garden",
    "Indoor Lighting": "Home & Living",
    "Kids' Play Vehicles": "Toys & Hobbies",
    "Beauty": "Health & Personal Care",
    "Cycling Shoes": "Sports & Outdoors",
    "Outdoor Heaters & Fire Pits": "Home & Garden",
    "Games & Game Accessories": "Electronics",
    "Boys": "Fashion & Apparel",
    "Handmade Artwork": "Home & Living",
    "Skin Care": "Health & Personal Care",
    "Coffee, Tea & Espresso": "Food & Beverage",
    "Home Entertainment Furniture": "Home & Living",
    "Guitars & Gear": "Musical Instruments",
    "Candles & Holders": "Home & Living",
    "Mobile Phone Accessories": "Electronics",
    "Mobile Phones & Smartphones": "Electronics",
    "Tripods & Monopods": "Photography & Videography",
    "SIM Cards": "Electronics",
    "Motorbike Accessories": "Automotive & Accessories",
    "Office Supplies": "Office & Stationery",
    "Home Brewing & Wine Making": "Food & Beverage",
    "Bedding Accessories": "Home & Living",
    "Gifts for Her": "Gifts & Occasions",
    "Kitchen Storage & Organisation": "Home & Living",
    "Motorbike Seat Covers": "Automotive & Accessories",
    "Electrical Power Accessories": "Electronics",
    "Clocks": "Home & Living",
    "Inflatable Beds, Pillows & Accessories": "Home & Living",
    "Pet Supplies": "Pets",
    "Curtain & Blind Accessories": "Home & Living",
    "Hydraulics, Pneumatics & Plumbing": "Industrial & Tools",
    "Basketball Footwear": "Sports & Outdoors",
    "Bathroom Lighting": "Home & Living",
    "Lenses": "Photography & Videography",
    "Radio Communication": "Electronics",
    "Motorbike Engines & Engine Parts": "Automotive & Accessories",
    "eBook Readers & Accessories": "Electronics",
    "Motorbike Chassis": "Automotive & Accessories",
    "Home Entertainment": "Electronics",
    "Jigsaws & Puzzles": "Toys & Hobbies",
    "Luggage and travel gear": "Fashion & Apparel",
    "Building & Construction Toys": "Toys & Hobbies",
    "Bird & Wildlife Care": "Home & Garden",
    "Men's Sports & Outdoor Shoes": "Fashion & Apparel",
    "Luxury Food & Drink": "Food & Beverage",
    "Gardening": "Home & Garden",
    "Lights and switches": "Home & Living",
    "Outdoor Lighting": "Home & Garden",
    "Computer Memory": "Electronics",
    "Media Streaming Devices": "Electronics",
    "Synthesisers, Samplers & Digital Instruments": "Musical Instruments",
    "Cushions & Accessories": "Home & Living",
    "Light Bulbs": "Home & Living",
    "Lighting": "Home & Living",
    "Monitor Accessories": "Electronics",
    "Office Paper Products": "Office & Stationery",
    "Outdoor Cooking": "Home & Garden",
    "Smartwatches": "Electronics",
    "Rugs, Pads & Protectors": "Home & Living",
    "Heating, Cooling & Air Quality": "Home & Living",
    "Keyboards, Mice & Input Devices": "Electronics",
    "Hi-Fi Speakers": "Electronics",
    "Action Cameras": "Photography & Videography",
    "Wearable Technology": "Electronics",
    "Equestrian Sports Boots": "Sports & Outdoors",
    "Telephones, VoIP & Accessories": "Electronics",
    "Garden DÃ©cor": "Home & Garden",
    "Tablets": "Electronics",
    "Ski Clothing": "Sports & Outdoors",
    "Large Appliances": "Home & Living",
    "Coffee & Espresso Machines": "Home & Living",
    "Pens, Pencils & Writing Supplies": "Office & Stationery",
    "Art & Craft Supplies": "Toys & Hobbies",
    "Mobile Phones & Communication": "Electronics",
    "Billiard, Snooker & Pool": "Sports & Outdoors",
    "Vacuums & Floorcare": "Home & Living",
    "Kids' Dress Up & Pretend Play": "Toys & Hobbies",
    "Monitors": "Electronics",
    "Hobbies": "Toys & Hobbies",
    "Projectors": "Electronics",
    "Bath & Body": "Health & Personal Care",
    "Bathroom Linen": "Home & Living",
    "Motorbike Brakes": "Automotive & Accessories",
    "Office Electronics": "Electronics",
    "Gifts for Him": "Gifts & Occasions",
    "Snow Sledding Equipment": "Sports & Outdoors",
    "Handmade Jewellery": "Fashion & Apparel",
    "Tennis Shoes": "Sports & Outdoors",
    "Data Storage": "Electronics",
    "Customers' Most Loved": "Miscellaneous",
    "Kitchen Tools & Gadgets": "Home & Living",
    "Hi-Fi Receivers & Separates": "Electronics",
    "Blank Media Cases & Wallets": "Electronics",
    "School & Educational Supplies": "Office & Stationery",
    "Digital Frames": "Photography & Videography",
    "Painting Supplies, Tools & Wall Treatments": "Home & Living",
    "Dolls & Accessories": "Toys & Hobbies",
    "Motorbike Clothing": "Automotive & Accessories",
    "3D Printers": "Electronics",
    "Boxing Shoes": "Sports & Outdoors",
    "Photo Printers": "Photography & Videography",
    "Photo Frames": "Home & Living",
    "Dining Room Furniture": "Home & Living",
    "Construction Machinery": "Industrial & Tools",
    "Baby & Toddler Toys": "Toys & Hobbies",
    "Women": "Fashion & Apparel",
    "Printer Accessories": "Electronics",
    "CD, Disc & Tape Players": "Electronics",
    "Plants, Seeds & Bulbs": "Home & Garden",
    "Skiing Poles": "Sports & Outdoors",
    "Sports Supplements": "Health & Personal Care",
    "Boating Footwear": "Sports & Outdoors",
    "KVM Switches": "Electronics",
    "Headphones, Earphones & Accessories": "Electronics",
    "Pools, Hot Tubs & Supplies": "Home & Garden",
    "Computer Memory Card Accessories": "Electronics",
    "Lab & Scientific Products": "Industrial & Tools",
    "Women's Sports & Outdoor Shoes": "Fashion & Apparel",
    "Handmade Gifts": "Gifts & Occasions",
    "Car & Vehicle Electronics": "Automotive & Accessories",
    "Remote & App-Controlled Devices": "Toys & Hobbies",
    "Alexa Built-In Devices": "Electronics",
    "Camcorders": "Photography & Videography",
    "Motorbike Exhaust & Exhaust Systems": "Automotive & Accessories",
    "Ski Helmets": "Sports & Outdoors",
    "Toy Advent Calendars": "Toys & Hobbies",
    "Garden Furniture & Accessories": "Home & Garden",
    "Recording & Computer": "Musical Instruments",
    "Handmade": "Home & Living",
    "Home Cinema, TV & Video": "Electronics",
    "Motorbike Instruments": "Automotive & Accessories",
    "Hockey Shoes": "Sports & Outdoors",
    "Rough Plumbing": "Industrial & Tools",
    "Water Coolers, Filters & Cartridges": "Home & Living"
};


// TODO : Both of this logics still have issues when writing data to table. Some data are still added as Null . No error or fallback either
// Have to run the script multiple times to fill all the values
  
//   async function updateCategoriesBatch(limit: number, offset: number) {
//     const client = await db.connect();
//     try {
//       const res = await client.query('SELECT id, subcategory FROM "120k_products" LIMIT $1 OFFSET $2', [limit, offset]);
  
//       for (const row of res.rows) {
//         const generalizedCategory = categoryMap[row.subcategory] || "Other";
  
//         await client.query(
//           `UPDATE "120k_products" SET category = $1 WHERE id = $2`,
//           [generalizedCategory, row.id]
//         );
//       }
//     } finally {
//       client.release();
//     }
//   }
  
//   async function runBatches() {
//     const totalRows = 119852; 
//     const batchSize = 1000;
  
//     for (let offset = 0; offset < totalRows; offset += batchSize) {
//       await updateCategoriesBatch(batchSize, offset);
//       console.log(`Processed batch starting at offset ${offset}`);
//     }
  
//     console.log('All categories updated.');
//   }
  
//   runBatches().catch(console.error);

async function updateCategoriesBatch(limit: number, offset: number) {
    const client = await db.connect();
    try {
      await client.query('BEGIN'); 
      const res = await client.query(
        'SELECT id, subcategory FROM "120k_products" WHERE category IS NULL LIMIT $1 OFFSET $2',
        [limit, offset]
      );
  
      const failedUpdates: { id: number, subcategory: string }[] = [];
  
      for (const row of res.rows) {
        const generalizedCategory = categoryMap[row.subcategory] || "Other";
  
        const result = await client.query(
          `UPDATE "120k_products" SET category = $1 WHERE id = $2`,
          [generalizedCategory, row.id]
        );
  
        if (result.rowCount === 0) {
          failedUpdates.push({ id: row.id, subcategory: row.subcategory });
        }
      }
  
      await client.query('COMMIT'); 
  
    
      if (failedUpdates.length > 0) {
        console.warn(`Failed to update ${failedUpdates.length} rows in batch starting at offset ${offset}`);
        console.log(failedUpdates);
      }
    } catch (err) {
      await client.query('ROLLBACK'); 
      console.error(`Error updating categories in batch starting at offset ${offset}:`, err);
      throw err; 
    } finally {
      client.release();
    }
  }
  
  async function runBatches() {
    const totalRows = 119852;
    const batchSize = 1000;
  
    for (let offset = 0; offset < totalRows; offset += batchSize) {
      try {
        await updateCategoriesBatch(batchSize, offset);
        console.log(`Processed batch starting at offset ${offset}`);
      } catch (err) {
        console.error(`Error processing batch starting at offset ${offset}:`, err);
      }
    }
  
    console.log('All categories updated.');
  }
  
  runBatches().catch(console.error);
  