var swalIcon = {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning",
};

function swalConfirm(options) {
    swal({
        title: options.text ? options.text : "是否删除"
        , buttons: {
            cancel: {
                text: "取消",
                value: false,
                visible: true,
                closeModal: true,
            },
            confirm: {
                text: "确定",
                value: true,
                visible: true,
                className: "",
                closeModal: true
            }
        }
    }).then(function (value) {
        if (typeof options.OK == 'function') {
            if (value) {
                options.OK();
            }
        }
    })
}

function swalAlert(text,icon) {
    swal(text, "", icon);
}