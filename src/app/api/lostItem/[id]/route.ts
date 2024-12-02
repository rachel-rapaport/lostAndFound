import { NextApiRequest, NextApiResponse } from "next";
import {
  getLostItems,
  getLostItemById,
  createLostItem,
  updateLostItemById,
  deleteLostItemById,
} from "@/app/services/lostItemsService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // get lost item/s
  if (req.method === "GET") {
    try {
      if (id) {
        // get lost item by id
        const lostItem = await getLostItemById(id as string);
        if (!lostItem) {
          return res.status(404).json({ error: "Lost item not found hello" });
        }
        res.status(200).json(lostItem);
      } else {
        // get all lost items
        const lostItems = await getLostItems();
        return res.status(200).json(lostItems);
      }
    } catch (error: unknown) {
      res.status(500).json({ error: "failed to fetch lost item" });
      console.log(error);
    }
    // update lost item by id
  } else if (req.method === "PUT") {
    try {
      const updatedLostItem = await updateLostItemById(id as string, req.body);
      if (!updatedLostItem) {
        return res.status(404).json({ error: "failed to update lost item" });
      }
      return res.status(200).json(updatedLostItem);
    } catch (error: unknown) {
      res.status(500).json({ error: "failed to update lost item" });
      console.log(error);
    }
    // create new lost item
  } else if (req.method === "POST") {
    try {
      const newLostItem = await createLostItem(req.body);
      if (!newLostItem) {
        return res
          .status(404)
          .json({ error: "failed to create new lost item" });
      }
      return res.status(200).json(newLostItem);
    } catch (error: unknown) {
      res.status(500).json({ error: "failed to create lost item" });
      console.log(error);
    }
    // delete lost item by id
  } else if (req.method === "DELETE") {
    try {
      const deletedlostitem = await deleteLostItemById(id as string);
      if (!deletedlostitem) {
        return res.status(404).json({ error: "failed to delete lost item" });
      }
      return res.status(200).json(deletedlostitem);
    } catch (error: unknown) {
      return res.status(500).json({ error: "failed to delete lost item" });
      console.log(error);
    }
  }
};

export default handler;
