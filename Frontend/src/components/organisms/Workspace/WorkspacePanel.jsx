import { AlertTriangleIcon, BotIcon, HashIcon, Loader, MessageSquareTextIcon, SendHorizonalIcon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { SideBarItem } from '@/components/atoms/SideBarItem/SideBarItem';
import { UserItem } from '@/components/atoms/UserItem/UserItem';
import { AIChatDrawer } from '@/components/molecules/AIChat/AIChatDrawer';
import { WorkspacePanelHeader } from '@/components/molecules/Workspace/WorkspacePanelHeader';
import { WorkspacePanelSection } from '@/components/molecules/Workspace/WorkspacePanelSection';
import { useGetWorkspaceById } from '@/hooks/apis/workspaces/useGetWorkspaceById';
import { useCreateChannelModal } from '@/hooks/context/useCreateChannelModal';

export const WorkspacePanel = () => {

    const [aiChatOpen, setAiChatOpen] = useState(false);
    const { workspaceId } = useParams();
    const { setOpenCreateChannelModal } = useCreateChannelModal();
    const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId);

    if (isFetching) {
        return (
            <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                <Loader className='animate-spin size-6 text-white' />
            </div>
        );
    }

    if (!isSuccess) {
        return (
            <div className='flex flex-col gap-y-2 h-full items-center justify-center text-white'>
                <AlertTriangleIcon className='size-6 text-white' />
                Something went wrong
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-slack-medium">
            <WorkspacePanelHeader workspace={workspace} />

            <div className='flex flex-col px-2 mt-3'>
                <SideBarItem
                    label="Threads"
                    icon={MessageSquareTextIcon}
                    id="threads"
                    variant='active'
                />
                <SideBarItem
                    label="Drafts & Sends"
                    icon={SendHorizonalIcon}
                    id="drafts"
                    variant='default'
                />
            </div>

            <WorkspacePanelSection
                label={'Channels'}
                onIconClick={() => { setOpenCreateChannelModal(true); }}
            >
                {workspace?.channels?.map((channel) => (
                    <SideBarItem key={channel._id} icon={HashIcon} label={channel.name} id={channel._id} />
                ))}
            </WorkspacePanelSection>

            <WorkspacePanelSection
                label="Direct messages"
                onIconClick={() => {}}
            >
                {workspace?.members?.map((item) => (
                    <UserItem key={item.memberId._id} label={item.memberId.username} id={item.memberId._id} image={item.memberId.avatar} />
                ))}
            </WorkspacePanelSection>

            <WorkspacePanelSection
    label="Talk With AI"
    onIconClick={() => setAiChatOpen(true)}
>
    {/* ✅ Plain button — no routing, no channel fetch */}
    <button
        onClick={() => setAiChatOpen(true)}
        className="flex items-center gap-1.5 px-2 py-1 w-full rounded-md text-white/90 hover:bg-white/10 text-sm transition-colors"
    >
        <SparklesIcon className="size-4" />
        <span>AI Assistant</span>
    </button>
</WorkspacePanelSection>

            {/* ✅ Drawer placed correctly inside return, outside all sections */}
            <AIChatDrawer isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} />

        </div>
    );
};