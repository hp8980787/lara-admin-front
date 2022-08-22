import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
//拖拽面板
import { DndPanel, SelectionSelect } from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";
//菜单
import { Control } from "@logicflow/extension";

import Applicant from "@/components/Workflow/applicant.js";
import Check from "@/components/Workflow/check.js";
import Condition from "@/components/Workflow/condition.js";
import Finish from "@/components/Workflow/finish.js";

LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
LogicFlow.use(Control);


const ObjectDraw = class {

    init(element) {
        const Draw = new LogicFlow({
            container: element,
            grid: true,
            keyboard: {
                enabled: true,
            },
        });
        Draw.extension.control.addItem({
            iconClass: "custom-minimap",
            title: "",
            text: "导航",
            onMouseEnter: (lf, ev) => {
                const position = lf.getPointByClient(ev.x, ev.y);
                lf.extension.miniMap.showMiniMap.show(
                    position.domOverlayPosition.x - 120,
                    position.domOverlayPosition.y + 35
                );
            },
            onClick: (lf, ev) => {
                const position = lf.getPointByClient(ev.x, ev.y);
                lf.extension.miniMap.show(
                    position.domOverlayPosition.x - 120,
                    position.domOverlayPosition.y + 35
                );
            },
        });
        Draw.register(Applicant);
        Draw.register(Check);
        Draw.register(Condition);
        Draw.register(Finish);
        Draw.render(this.data);
        Draw.extension.dndPanel.setPatternItems([
            {
                label: "申请人",
                type: "applicant",
                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==",
            },
            {
                label: "审核人",
                type: "check",
                icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjYwODEwODczODUwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM4NjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBmZWVkYmFjay1pY29uZm9udDsgc3JjOiB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmYyP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgid29mZjIiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS53b2ZmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgid29mZiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LnR0Zj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoInRydWV0eXBlIik7IH0KPC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUwOS45MiAxNzZDMzI1LjUwNCAxNzYgMTc2IDMyNS41MDQgMTc2IDUwOS45MmMwIDE4NC40MTYgMTQ5LjUwNCAzMzMuOTIgMzMzLjkyIDMzMy45MiAxODQuNDE2IDAgMzMzLjkyLTE0OS41MDQgMzMzLjkyLTMzMy45MkM4NDMuODQgMzI1LjUwNCA2OTQuMzIgMTc2IDUwOS45MiAxNzZ6IG0wIDQ4YzE1Ny45MDQgMCAyODUuOTIgMTI4IDI4NS45MiAyODUuOTIgMCAxNTcuOTA0LTEyOC4wMTYgMjg1LjkyLTI4NS45MiAyODUuOTJDMzUyIDc5NS44NCAyMjQgNjY3LjgwOCAyMjQgNTA5LjkyIDIyNCAzNTIgMzUyIDIyNCA1MDkuOTIgMjI0eiBtMTgyLjY0IDE2Ni44NDhMNDYxLjEyIDYyMi4yODhsLTEzNi45OTItMTM2Ljk5MmExNiAxNiAwIDAgMC0yMi42MjQgMGwtMTEuMzEyIDExLjMxMmExNiAxNiAwIDAgMCAwIDIyLjYyNGwxNTkuNjE2IDE1OS42MTZhMTYgMTYgMCAwIDAgMjIuNjI0IDBsMjU0LjA4LTI1NC4wNjRhMTYgMTYgMCAwIDAgMC0yMi42MjRsLTExLjMyOC0xMS4zMTJhMTYgMTYgMCAwIDAtMjIuNjI0IDB6IiBwLWlkPSIzODY1IiBmaWxsPSIjMTI5NmRiIj48L3BhdGg+PC9zdmc+",
            },
            {
                label: "条件",
                type: "condition",
                icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjYwODExNzkzNDQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ5MTUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+QGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBmZWVkYmFjay1pY29uZm9udDsgc3JjOiB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmYyP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgid29mZjIiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzEwMzExNThfdTY5dzh5aHhkdS53b2ZmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgid29mZiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LnR0Zj90PTE2MzAwMzM3NTk5NDQiKSBmb3JtYXQoInRydWV0eXBlIik7IH0KPC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTkyOCA3MDRoLTIyNHYxOTJoMjI0ek02MjQgNzA0aC0yMjR2MTkyaDIyNHpNMzIwIDcwNEg5NnYxOTJoMjI0eiIgZmlsbD0iI0Y1QTYyMyIgcC1pZD0iNDkxNiI+PC9wYXRoPjxwYXRoIGQ9Ik02NzIgMTI4SDM1MnYxOTJoMzIweiIgZmlsbD0iIzAwN0VFNiIgcC1pZD0iNDkxNyI+PC9wYXRoPjxwYXRoIGQ9Ik04MzYuOTYgNDY0VjY0MGgtMzJ2LTE0NEgyMjQuMzJWNjQwaC0zMnYtMTc2eiIgZmlsbD0iIzY0NkU3RiIgcC1pZD0iNDkxOCI+PC9wYXRoPjwvc3ZnPg==",
            },
            {
                label: "结束",
                type: "finish",
                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC",
            },
            {
                label: "选区",
                icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=",
                callback: () => {
                    Draw.extension.selectionSelect.openSelectionSelect();
                    Draw.once("selection:selected", () => {
                        Draw.extension.selectionSelect.closeSelectionSelect();
                    });
                },
            },
        ]);
        return Draw
    }
}
export default ObjectDraw