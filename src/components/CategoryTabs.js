import {connect} from "react-redux"
import {addPost, deletePost} from "../actions/postsActions"
import {openCategory} from "../actions/categoryActions"
import Modal from "react-modal"
import React, {Component} from "react"

const Tabs = props => (
    <div
        className="ui top attached tabular menu"
    >
        {
            props.tabs.map((tab, index) => (
                <div
                    className={tab.active ? "active item" : "item"}
                    key={index}
                    onClick={() => props.onClick(tab.id)}
                >
                    {tab.title}
                </div>
            ))
        }
    </div>
)

const mapDispatchToTabsProps = dispatch => (
    {
        onClick: id => (
            dispatch(openCategory(id))
        ),
    }
)

const mapStateToTabsProps = (state) => {
    const categories = []
    for (let key in state.categories.byId) {
        // console.log(state.categories.byId[key])
        categories.push(state.categories.byId[key])
    }
    const activeCategoryId = state.activeCategoryId
    const categoryTabs = categories.map(c => (
        {
            title: c.name,
            active: c.id === activeCategoryId,
            id: c.id,

        }
    ))
    return {
        tabs: categoryTabs,
    }
}
export const CategoryTabs =  connect(
    mapStateToTabsProps,
    mapDispatchToTabsProps
)(Tabs)
