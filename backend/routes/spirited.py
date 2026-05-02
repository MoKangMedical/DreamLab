"""千与千寻游戏路由 - 同步版本"""
from fastapi import APIRouter, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from ..config import SYNC_DATABASE_URL
from ..models import Base, SpiritedProgress, SpiritedDialogue

engine = create_engine(SYNC_DATABASE_URL, echo=False)
router = APIRouter(prefix="/spirited", tags=["spirited"])

# 确保表存在
Base.metadata.create_all(bind=engine)

DEFAULT_USER_ID = 1

FLOOR_DATA = [
    {"floor": 1, "name": "油屋入口·遗忘之桥", "psychology": "freud", "desc": "记住你的名字，别让汤婆婆偷走它"},
    {"floor": 2, "name": "锅炉房·汤婆婆", "psychology": "jung", "desc": "面对阴影，认识完整的自己"},
    {"floor": 3, "name": "浴场·无脸男", "psychology": "modern", "desc": "识别情绪，不被欲望吞噬"},
    {"floor": 4, "name": "花园·河神", "psychology": "eastern", "desc": "净化梦境，转化内在能量"},
    {"floor": 5, "name": "顶层·白龙", "psychology": "integration", "desc": "整合自我，成为梦的解析师"},
]

TITLES = {1: "初入油屋者", 2: "阴影觉醒者", 3: "情绪炼金术士", 4: "梦境净化者", 5: "梦的解析师"}

DIALOGUES_DATA = [
    {"floor": 1, "npc_name": "汤婆婆", "dialogue_key": "greeting",
     "npc_text": "欢迎来到油屋，小姑娘。你叫什么名字？记住，在这里忘记名字的人，就再也回不了家了。",
     "player_choices": [
        {"text": "我叫千寻！", "next_key": "name_ok", "effect": {"flag": "name_remembered"}},
        {"text": "我...我忘了...", "next_key": "name_forgot", "effect": {"forget_name": True}},
     ], "next_dialogue": ""},
    {"floor": 1, "npc_name": "汤婆婆", "dialogue_key": "name_ok",
     "npc_text": "哼，记住就好。现在去锅炉房找锅炉爷爷，他会教你怎么在这里生存。记住——你的名字就是你的锚。",
     "player_choices": [{"text": "去锅炉房", "next_key": "goto_floor2", "effect": {"advance_floor": 2}}], "next_dialogue": "floor1_done"},
    {"floor": 1, "npc_name": "汤婆婆", "dialogue_key": "name_forgot",
     "npc_text": "无用的孩子！连名字都记不住……不过看你还算诚实，给你一次机会。",
     "player_choices": [{"text": "千寻！我是千寻！", "next_key": "name_ok", "effect": {"flag": "name_remembered"}}], "next_dialogue": ""},
    {"floor": 2, "npc_name": "锅炉爷爷", "dialogue_key": "greeting",
     "npc_text": "哟，新来的？汤婆婆那边我听说了。这里人手不够，你帮我分分这些药材——每种药材对应一种性格特质。",
     "player_choices": [{"text": "开始分药（荣格原型自测）", "next_key": "test_start", "effect": {"flag": "jung_test_start"}}], "next_dialogue": ""},
    {"floor": 2, "npc_name": "锅炉爷爷", "dialogue_key": "test_start",
     "npc_text": "善良、勇敢、好奇、固执……每个人心里都有这些影子。看清它们，就是看清自己。你分得很好！这把「阴影觉醒之钥」是你的了。",
     "player_choices": [{"text": "去浴场", "next_key": "goto_floor3", "effect": {"advance_floor": 3}}], "next_dialogue": ""},
    {"floor": 3, "npc_name": "无脸男", "dialogue_key": "greeting",
     "npc_text": "……（递上一把金子）给你……都给你……只要……陪我说说话……我好孤独……",
     "player_choices": [
        {"text": "拒绝金子，坐下来陪他", "next_key": "reject_gold", "effect": {"flag": "empathy_shown"}},
        {"text": "收下金子，快速离开", "next_key": "take_gold", "effect": {"forget_name": True}},
     ], "next_dialogue": ""},
    {"floor": 3, "npc_name": "无脸男", "dialogue_key": "reject_gold",
     "npc_text": "你……和别人不一样。别人只要我的金子，你……看见我了。这把「情绪辨识之钥」送给你。去花园吧，河神在等你。",
     "player_choices": [{"text": "去花园找河神", "next_key": "goto_floor4", "effect": {"advance_floor": 4}}], "next_dialogue": ""},
    {"floor": 3, "npc_name": "无脸男", "dialogue_key": "take_gold",
     "npc_text": "……原来你也和别人一样……（无脸男变得狂暴，整个浴场震动）",
     "player_choices": [{"text": "对不起！放下金子，陪他说话", "next_key": "reject_gold", "effect": {"flag": "empathy_shown"}}], "next_dialogue": ""},
    {"floor": 4, "npc_name": "河神", "dialogue_key": "greeting",
     "npc_text": "孩子，我的身体被人类的垃圾堵住了……帮我清理一下吧。作为回报，我也帮你净化一个最近的噩梦。",
     "player_choices": [{"text": "帮助河神清理", "next_key": "dream_cleanse", "effect": {"flag": "dream_analyzed"}}], "next_dialogue": ""},
    {"floor": 4, "npc_name": "河神", "dialogue_key": "dream_cleanse",
     "npc_text": "干净了！我感觉轻盈多了。你心里的那些焦虑和恐惧，我也一并带走了。这把「梦境净化之钥」给你。白龙在顶层等你——他认识你的。",
     "player_choices": [{"text": "去顶层找白龙", "next_key": "goto_floor5", "effect": {"advance_floor": 5}}], "next_dialogue": ""},
    {"floor": 5, "npc_name": "白龙", "dialogue_key": "greeting",
     "npc_text": "千寻，你终于来了。我已经记起了自己的名字——赈早见·琥珀主。你还记得你的名字吗？",
     "player_choices": [{"text": "我叫千寻，我是梦的解析师！", "next_key": "final_ok", "effect": {"flag": "final_title"}}], "next_dialogue": ""},
    {"floor": 5, "npc_name": "白龙", "dialogue_key": "final_ok",
     "npc_text": "恭喜你，千寻。你已经走完了油屋的五层，集齐了四把钥匙——记忆、阴影、情绪、净化。现在油屋的大门为你敞开，欢迎回来，梦的解析师。",
     "player_choices": [], "next_dialogue": "game_complete"},
]


@router.get("/floors")
def get_floors():
    return FLOOR_DATA


@router.get("/progress")
def get_progress():
    with Session(engine) as db:
        p = db.query(SpiritedProgress).filter(SpiritedProgress.user_id == DEFAULT_USER_ID).first()
        if not p:
            return {"current_floor": 1, "forget_name_count": 0, "keys_collected": [], "title_earned": "", "story_flags": {}, "shadows_met": []}
        return {"current_floor": p.current_floor, "forget_name_count": p.forget_name_count, "keys_collected": p.keys_collected or [], "title_earned": p.title_earned or TITLES.get(p.current_floor, ""), "story_flags": p.story_flags or {}, "shadows_met": p.shadows_met or []}


@router.post("/progress/floor/{floor}")
def advance_floor(floor: int):
    with Session(engine) as db:
        p = db.query(SpiritedProgress).filter(SpiritedProgress.user_id == DEFAULT_USER_ID).first()
        if not p:
            p = SpiritedProgress(user_id=DEFAULT_USER_ID, current_floor=floor)
            db.add(p)
        else:
            p.current_floor = max(p.current_floor, floor)
            p.title_earned = TITLES.get(p.current_floor, "")
        db.commit()
        return {"current_floor": p.current_floor, "title": TITLES.get(p.current_floor, "")}


@router.post("/progress/forget-name")
def forget_name():
    with Session(engine) as db:
        p = db.query(SpiritedProgress).filter(SpiritedProgress.user_id == DEFAULT_USER_ID).first()
        if not p:
            p = SpiritedProgress(user_id=DEFAULT_USER_ID, forget_name_count=1)
            db.add(p)
        else:
            p.forget_name_count = (p.forget_name_count or 0) + 1
        db.commit()
        return {"forget_name_count": p.forget_name_count}


@router.post("/progress/collect-key")
def collect_key(key_data: dict):
    with Session(engine) as db:
        p = db.query(SpiritedProgress).filter(SpiritedProgress.user_id == DEFAULT_USER_ID).first()
        if not p:
            p = SpiritedProgress(user_id=DEFAULT_USER_ID, keys_collected=[key_data])
            db.add(p)
        else:
            keys = p.keys_collected or []
            keys.append(key_data)
            p.keys_collected = keys
        db.commit()
        return {"keys_collected": p.keys_collected}


@router.get("/dialogues/{floor}")
def get_dialogues(floor: int, npc: str = None):
    """返回某层的对话。如果数据库有则用数据库，否则用内嵌数据"""
    with Session(engine) as db:
        # 先 seed 数据
        seed_count = 0
        for d in DIALOGUES_DATA:
            if d["floor"] != floor:
                continue
            if npc and d["npc_name"] != npc:
                continue
            exists = db.query(SpiritedDialogue).filter(
                SpiritedDialogue.floor == d["floor"],
                SpiritedDialogue.dialogue_key == d["dialogue_key"]
            ).first()
            if not exists:
                db.add(SpiritedDialogue(**d))
                seed_count += 1
        if seed_count > 0:
            db.commit()

        query = db.query(SpiritedDialogue).filter(SpiritedDialogue.floor == floor)
        if npc:
            query = query.filter(SpiritedDialogue.npc_name == npc)
        dialogues = query.all()
        return [{"id": d.id, "npc_name": d.npc_name, "dialogue_key": d.dialogue_key, "npc_text": d.npc_text, "player_choices": d.player_choices, "next_dialogue": d.next_dialogue} for d in dialogues]
