import { Button, Form, Input, InputNumber, message, Select, Table } from "antd";
import callAPI from "callAPI";
import { useCallback, useEffect, useMemo, useState } from "react";

const ItemPerPage = 5


export default function Categories() {
    const [EditMode, setEditMode] = useState(false)
    const [EditingField, setEditingField] = useState('')
    const [Categories, setCategories] = useState({ level0: [], level1: [] })
    const [Data, setData] = useState([])
    const [Current, setCurrent] = useState(1)
    const [Total, setTotal] = useState(0)
    const [form] = Form.useForm()

    const handleGetData = () => {
        callAPI.get(`/categories?skip=${(Current - 1) * ItemPerPage}&limit=${ItemPerPage}`)
            .then((res: { data: [], total: number }) => {
                setData([...res.data])
                setTotal(res.total)
            })


        callAPI.get('/categories?level=0')
            .then((res0: { data: [] }) => {
                callAPI.get('/categories?level=1')
                    .then(res1 => {
                        setCategories({
                            level0: res0.data,
                            level1: res1.data
                        })
                    })
            })
    }

    useEffect(() => {
        handleGetData()
    }, [])

    useEffect(() => {
        callAPI.get(`/categories?skip=${(Current - 1) * ItemPerPage}&limit=${ItemPerPage}`)
            .then((res: { data: [], total: number }) => {
                setData([...res.data])
                setTotal(res.total)
            })

    }, [Current])

    const handleEdit = useCallback((data) => {
        const raw_data = {
            name_vi: data.name.vi,
            name_en: data.name.en,
            slug_vi: data.slug.vi,
            slug_en: data.slug.en,
            description_vi: data.description.vi,
            description_en: data.description.en,
            order: data.order
        }
        form.setFieldsValue(raw_data)
        setEditMode(true)
        setEditingField(data._id)
    }, [])

    const handleDelete = async (data) => {
        const r = window.confirm('X??c nh???n x??a')
        if (!r) return
        await callAPI.delete(`/categories?_id=${data._id}`)
        message.success('X??a th??nh c??ng')
        handleGetData()
    }

    const column = useMemo(() => {
        return [
            {
                title: "H??nh ?????ng",
                key: "_id",
                dataIndex: "_id",
                render: (_id, data) => (
                    <>
                        <Button onClick={() => handleEdit(data)} type="primary">S???a</Button>
                        <Button onClick={() => handleDelete(data)} type="text">X??a</Button>
                    </>
                )
            },
            {
                title: "T??n",
                dataIndex: "name",
                key: "_id",
                render: name => (
                    <>
                        Vi???t : {name.vi} <br />
                        Anh : {name.en}
                    </>
                )
            },
            {
                title: "Level",
                dataIndex: "level",
                key: "_id",
            },
            {
                title: "Th??? t???",
                dataIndex: "order",
                key: "_id",
            },
        ]
    }, [])

    const handleCancelEdit = () => {
        setEditMode(false)
        form.resetFields()
    }
    const handleSubmitForm = useCallback(async (value) => {
        const data = {
            name: {
                vi: value.name_vi,
                en: value.name_en,
            },
            slug: {
                vi: value.slug_vi,
                en: value.slug_en,
            },
            description: {
                vi: value.description_vi,
                en: value.description_en,
            },
            image: {
                vi: value.image_vi,
                en: value.image_en,
            },
            order: value.order,
            parent: value.parent
        }

        if (EditMode) {
            await callAPI.put(`/categories?_id=${EditingField}`, data)
            handleCancelEdit()
            message.success('S???a th??nh c??ng')

        }
        if (!EditMode) {
            await callAPI.post('/categories', data)
            message.success('T???o th??nh c??ng')
        }
        handleGetData()
    }, [EditMode])


    return (
        <div className="container">
            <Form
                form={form}
                initialValues={{ parent: "" }}
                onFinish={handleSubmitForm}>
                <Form.Item labelCol={{ span: 3 }} label="T??n ti???ng Vi???t" name="name_vi">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="T??n ti???ng Anh" name="name_en">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="URL ti???ng Vi???t" name="slug_vi">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="URL ti???ng Anh" name="slug_en">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="M?? t??? ti???ng Vi???t" name="description_vi">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="M?? t??? ti???ng Anh" name="description_en">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="Thumbnail ti???ng Vi???t" name="image_vi">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="Thumbnail ti???ng Anh" name="image_en">
                    <Input />
                </Form.Item>
                <Form.Item labelCol={{ span: 3 }} label="Th??? t???" name="order">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                {
                    !EditMode && <Form.Item labelCol={{ span: 3 }} label="Danh m???c cha" name="parent">
                        <Select>
                            <Select.Option value={''}>=========Kh??ng=========</Select.Option>
                            <Select.OptGroup label="Level 0">
                                {
                                    Categories.level0.map((o: { _id: string, name: { vi: string } }) => (<Select.Option key={o._id} value={o._id}>{o.name.vi}</Select.Option>))
                                }
                            </Select.OptGroup>
                            <Select.OptGroup label="Level 1">
                                {
                                    Categories.level1.map((o: { _id: string, name: { vi: string } }) => (<Select.Option key={o._id} value={o._id}>{o.name.vi}</Select.Option>))
                                }
                            </Select.OptGroup>

                        </Select>
                    </Form.Item>
                }
                {
                    EditMode ?
                        <>
                            <Button type="primary" htmlType="submit">S???a</Button>
                            <Button type="text" onClick={handleCancelEdit} htmlType="button">H???y ch???nh s???a</Button>
                        </>
                        :
                        <>
                            <Button type="primary" htmlType="submit">T???o</Button>
                            <Button type="text" htmlType="reset">H???y</Button>
                        </>
                }
            </Form>
            <Table
                dataSource={Data}
                columns={column}
                pagination={
                    {
                        position: ["bottomRight"],
                        current: Current,
                        pageSize: ItemPerPage,
                        total: Total,
                        onChange: (page) => setCurrent(page)
                    }
                } />
        </div>
    )
}