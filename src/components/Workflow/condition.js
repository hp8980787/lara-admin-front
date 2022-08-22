import { DiamondNode, DiamondNodeModel } from "@logicflow/core";
class ConditionModel extends DiamondNodeModel { }
class ConditionView extends DiamondNode { }
export default {
    type: 'condition',
    model: ConditionModel,
    view: ConditionView
}