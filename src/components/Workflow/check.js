
import { RectNode, RectNodeModel } from "@logicflow/core";
class ApplicantMolde extends RectNodeModel {
    getNodeStyle() {
        const style = super.getNodeStyle();
        const properties = this.properties
        if (properties.status === 'pass') {
            style.stroke = 'green'
        } else if (properties.status === 'reject') {
            style.stroke = 'red'
        } else if (properties.status==='return') {
            style.stroke = 'yellow'
        }else{
            style.stroke='blue'
        }
        return style
    }
    initNodeData(data) {
        super.initNodeData(data)
        this.text.draggable = false; // 不允许文本被拖动
        this.text.editable = true; // 不允许文本被编辑
        this.text.value = '审核人'
    }
    getTextStyle() {
        const style = super.getTextStyle();
        style.fontSize = 16;
        // style.color = 'red';
        return style;
    }
}
class ApplicantView extends RectNode { }

export default {
    type: 'check',
    view: ApplicantView,
    model: ApplicantMolde,
}