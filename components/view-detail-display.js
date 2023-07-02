import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';


const ViewDetailDisplay = ({ data }) => {
    const [ownerIsOpen, setOwnerIsOpen] = useState(false);

    return (
            <>
                <div className="p-b-2">
                    <span>ID: </span>{data.id}
                </div>
                <div className="p-b-2">
                    <span>Name: </span>{data.name}
                </div>
                <div className="p-b-2">
                    <span>Full name: </span>{data.full_Name}
                </div>
                <div className="p-b-2">
                    <span>Private: </span>{data.private}
                </div>

                
                {/* <button className="" onClick={() => setOwnerIsOpen(!ownerIsOpen)}>Show More</button>
                <div className={ownerIsOpen ? 'transition-all duration-700 translate-y-5' : ''}>
                    <p>More to show</p>
                </div> */}

                <Disclosure>
                    <Disclosure.Button className="py-2">
                        Show Owner information
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500">
                        <div className="p-l-2">
                            <div>login: {data.owner.login}</div>
                            <div>id: {data.owner.id}</div>
                            <div>node_Id: {data.owner.node_Id}</div>
                            <div>avatar_Url: {data.owner.avatar_Url}</div>
                            <div>gravatar_Id: {data.owner.gravatar_Id}</div>
                            <div>url: {data.owner.url}</div>
                            <div>followers_Url: {data.owner.followers_Url}</div>
                            <div>following_Url: {data.owner.following_Url}</div>
                            <div>gists_Url: {data.owner.gists_Url}</div>
                            <div>starred_Url: {data.owner.starred_Url}</div>
                            <div>subscriptions_Url: {data.owner.subscriptions_Url}</div>
                            <div>organizations_Url: {data.owner.organizations_Url}</div>
                            <div>repos_Url: {data.owner.repos_Url}</div>
                            <div>events_Url: {data.owner.events_Url}</div>
                            <div>received_Events_Url: {data.owner.received_Events_Url}</div>
                            <div>type: {data.owner.type}</div>
                            <div>site_Admin: {data.owner.site_Admin}</div>
                        </div>
                    </Disclosure.Panel>
                </Disclosure>

                <div className="p-b-2">
                    <span>License: </span>{JSON.stringify(data.license)}
                </div>
            </>
    );
};

export default ViewDetailDisplay;