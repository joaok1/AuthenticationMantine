import { IResourceComponentsProps, useMany } from "@refinedev/core";

import {
    List,
    TextField,
    useTable,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { IPost } from "../interfaces/index";
import { useState } from "react";

export function TableList({ data, onPageChange, column }: { data: any; onPageChange: (page: number) => void; column: any }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { tableProps } = useTable<IPost>();
    const pagination = {
        pageSize: 10,
        current: currentPage,  
        total: data?.totalElements,
        onChange: (page: any) => {
            console.log(tableProps)
            setCurrentPage(page);
            onPageChange(page - 1);
        },
    };
    tableProps.dataSource = data?.content;
    tableProps.loading = false;
    tableProps.pagination = pagination;
    if (data) {
    tableProps.loading = false;
    }
    return (
        <List>
            <Table {...tableProps} rowKey="id">
                {column.map((column: any, index: any) => (
                    <Table.Column
                    key={index}
                    dataIndex={column.dataIndex}
                    title={column.label}
                    sorter={data}
                    render={(value, record) => {
                        const nestedProperty = column.dataIndex.split('.').reduce((obj: { [x: string]: any; }, key: string | number) => obj[key], record);
                        return (
                            <TextField
                            value={nestedProperty}
                            />
                        );
                    }}
                />
                ))
            }
            <Table.Column<IPost>
                title="Ações"
                dataIndex="index"
                render={(_, record) => {
                    return (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )
                }
                }
            />
            </Table>
        </List>
    );
};

