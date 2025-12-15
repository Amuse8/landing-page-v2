import db1 from "@/assets/category-icons/data-icon.png";
import db2 from "@/assets/category-icons/business-icon.png";
import db3 from "@/assets/category-icons/task-automation-icon.png";

import vv1 from "@/assets/category-icons/image-icon.png";
import vv2 from "@/assets/category-icons/analytics-icon.png";
import vv3 from "@/assets/category-icons/object-icon.png";
import vv4 from "@/assets/category-icons/subtitle-icon.png";

import rp1 from "@/assets/category-icons/recommend-icon.png";
import rp2 from "@/assets/category-icons/contents-icon.png";
import rp3 from "@/assets/category-icons/recommendation-engines-icon.png";

import nv1 from "@/assets/category-icons/documents-icon.png";

export const CATEGORY_ICON_LIST: Record<string, string[]> = {
    "data-business": [db1, db2, db3],
    "vision-video": [vv1, vv2, vv3, vv4],
    "recommend-personalization": [rp1, rp2, rp3],
    "natural-voice": [nv1,],
    "robotics": [],
    "multimodal": [],
    "app-web": [],
    "crm-erp": [],
}