import { List, TextField, useTable, EditButton, ShowButton, DeleteButton } from "@refinedev/antd";
import { Table, Space } from "antd";
import { IPost } from "../interfaces/index";
import { useState } from "react";

export function TableList({ dataSource, onChange, column }: { dataSource: any; onChange: (page: number, sorter:any) => void; column: any }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { tableProps } = useTable<IPost>();

    const change = (pagination: any, filters: any, sorter: any) => {
        setCurrentPage(pagination.current);
        sorter.column ? onChange(pagination.current - 1, sorter) : onChange(pagination.current - 1,"");
    };

    const date = {
        pagination: {
            pageSize: 10,
            current: currentPage,
            total: dataSource?.totalElements,
        },
    };

    tableProps.dataSource = dataSource?.content;
    tableProps.loading = false;
    tableProps.pagination = date.pagination;

    return (
        <List>
            <Table {...tableProps} rowKey="id" onChange={change}>
                {column.map((column: any, index: any) => (
                    <Table.Column
                        key={index}
                        dataIndex={column.dataIndex}
                        title={column.label}
                        sorter={column.sorter}
                        render={(value, record) => {
                            const nestedProperty = column.dataIndex.split('.').reduce((obj: { [x: string]: any; }, key: string | number) => obj[key], record);
                            return (
                                <TextField
                                    value={nestedProperty}
                                />
                            );
                        }}
                    />
                ))}
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
}
