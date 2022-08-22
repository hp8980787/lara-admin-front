import { CircleNode, CircleNodeModel } from "@logicflow/core";
class FinishModel extends CircleNodeModel {
    getNodeStyle() {
        const style = super.getNodeStyle();
        const properties = this.properties
        if (properties.status === 'success') {
            style.stroke = 'green'
        } else{
            style.stroke='red'
        }
        return style
    }
    initNodeData(data) {
        super.initNodeData(data)
        this.text.draggable = false; // 不允许文本被拖动
        this.text.editable = true; // 不允许文本被编辑
        this.text.value = '结束'
    }
}
class FinishView extends CircleNode { }
export default {
    type: 'finish',
    model: FinishModel,
    view: FinishView,
}