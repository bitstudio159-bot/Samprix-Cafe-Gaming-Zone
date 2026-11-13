import 'dotenv/config';
import mongoose from 'mongoose';
import { MENU_ITEMS } from '../src/data/menuData';
import { MenuItemModel } from '../src/server/models/MenuItem';
import { connectDatabase } from '../src/server/config/database';

async function migrateMenuData() {
  try {
    await connectDatabase();

    console.log('Starting Samprix menu migration...');
    console.log(`Source menu items: ${MENU_ITEMS.length}`);

    const existingCount = await MenuItemModel.countDocuments();

    console.log(`Existing MongoDB menu items: ${existingCount}`);

    // Safety: do not import into a collection containing records.
    if (existingCount > 0) {
      console.log('Migration stopped: menu collection already contains records.');
      return;
    }

    // Insert only items whose IDs are not already present.
    const operations = MENU_ITEMS.map(item => ({
      updateOne: {
        filter: { id: item.id },
        update: { $setOnInsert: item },
        upsert: true
      }
    }));

    const result = await MenuItemModel.bulkWrite(operations, {
      ordered: true
    });

    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Matched existing: ${result.matchedCount}`);
    console.log('Menu migration completed.');

    const finalCount = await MenuItemModel.countDocuments();
    console.log(`Final MongoDB menu items: ${finalCount}`);

  } catch (error) {
    console.error('Menu migration failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

migrateMenuData();